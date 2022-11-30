const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getVehicleAdvertsByUserUuid = async function (userUuid) {
    let adverts = await prisma.vehicleAdvert.findMany({
        where: {
            owner: {
                uuid: userUuid
            }
        },
        include: {
            fuelType: true,
            transmissionType: true,
            vehicleImages: true,
            wheelDriveType: true,
            licenseClass: true,
            owner: true
        }
    });

    adverts = adverts.filter((advert) => {
        return advert.isPublished;
    });

    return Promise.resolve(adverts);
};
