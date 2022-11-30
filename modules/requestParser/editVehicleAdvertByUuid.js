const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.editVehicleAdvertByUuid = async function (uuid, req) {
    let params = req.body;

    let isPublished = params.isPublished === 'on' ? true : false;
    let hasHitch = params.hasHitch === 'on' ? true : false;
    let keepImages = params.keepImages === 'on' ? true : false;
    let modelYear =
        parseInt(params.modelYear) !== 'number'
            ? parseInt(params.modelYear)
            : null;
    let weightInKg =
        parseInt(params.weightInKg) !== 'number'
            ? parseInt(params.weightInKg)
            : null;
    let mileageInKm =
        parseInt(params.mileageInKm) !== 'number'
            ? parseInt(params.mileageInKm)
            : null;

    modelYear = isNaN(modelYear) ? null : modelYear;
    weightInKg = isNaN(weightInKg) ? null : weightInKg;
    mileageInKm = isNaN(mileageInKm) ? null : mileageInKm;

    let editedCarAdvert = await prisma.vehicleAdvert.update({
        where: {
            uuid: uuid
        },
        data: {
            registrationNumber: params.registrationNumber,
            licenseClass: {
                connect: {
                    className: params.licenseClass
                }
            },
            fuelType: {
                connect: {
                    type: params.fuelType
                }
            },
            transmissionType: {
                connect: {
                    type: params.transmissionType
                }
            },
            wheelDriveType: {
                connect: {
                    type: params.wheelDriveType
                }
            },
            streetAddress: params.streetAddress,
            city: params.city,
            postalCode: params.postalCode,
            seatAmount: parseInt(params.seatAmount),
            brand: params.brand,
            model: params.model,
            modelYear: modelYear,
            weightInKg: weightInKg,
            mileageInKm: mileageInKm,
            color: params.color,
            costPerHourInNok: parseInt(params.costPerHourInNok),
            advertTitle: params.advertTitle,
            advertTitleSearch: params.advertTitle.toLowerCase(),
            advertDescription: params.advertDescription,
            advertDescriptionSearch: params.advertDescription.toLowerCase(),
            hasHitch: hasHitch,
            isPublished: isPublished
        }
    });

    if (!keepImages) {
        await prisma.vehicleImage.deleteMany({
            where: {
                belongsToVehicle: {
                    uuid: editedCarAdvert.uuid
                }
            }
        });
    }

    if (!req.files) {
        req.files = [];
    }

    for (let index = 0; index < req.files.length; index++) {
        const fileName = req.files[index].filename;
        console.log('filename: ' + fileName);
        await prisma.vehicleImage.create({
            data: {
                fileLocation: '/uploads/vehicleImages/' + fileName,
                belongsToVehicle: {
                    connect: {
                        uuid: editedCarAdvert.uuid
                    }
                }
            }
        });
    }

    await prisma.$disconnect();
    return Promise.resolve(editedCarAdvert);
};
