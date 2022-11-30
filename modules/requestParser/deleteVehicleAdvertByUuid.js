const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.deleteVehicleAdvertByUuid = async function (advertUuid) {
    const deletedVehicleImages = prisma.vehicleImage.deleteMany({
        where: {
            belongsToVehicle: {
                uuid: advertUuid
            }
        }
    });

    const deletedDrivingAidRelation = prisma.vehicleHasDrivingAid.deleteMany({
        where: {
            vehicle: {
                uuid: advertUuid
            }
        }
    });

    const deletedCarAdvert = prisma.vehicleAdvert.delete({
        where: {
            uuid: advertUuid
        }
    });

    const transaction = await prisma.$transaction([
        deletedDrivingAidRelation,
        deletedVehicleImages,
        deletedCarAdvert
    ]);

    await prisma.$disconnect();
    return Promise.resolve(transaction);
};
