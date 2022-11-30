const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getOwnVehicleAdvertByUuid = async function (uuid) {
    let advert = await prisma.vehicleAdvert
        .findUniqueOrThrow({
            where: {
                uuid: uuid
            },
            include: {
                fuelType: true,
                transmissionType: true,
                vehicleImages: true,
                wheelDriveType: true,
                licenseClass: true,
                owner: true
            }
        })
        .catch(async () => {
            await prisma.$disconnect();
            return Promise.reject(null);
        });

    return Promise.resolve(advert);
};
