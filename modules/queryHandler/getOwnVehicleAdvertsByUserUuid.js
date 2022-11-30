const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getOwnVehicleAdvertsByUserUuid = async function (userUuid) {
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

    return Promise.resolve(adverts);
};
