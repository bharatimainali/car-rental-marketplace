const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.deleteUserByUuid = async function (userUuid) {
    const deletedVehicleImages = prisma.vehicleImage.deleteMany({
        where: {
            belongsToVehicle: {
                owner: {
                    uuid: userUuid
                }
            }
        }
    });

    const deletedDrivingAidRelations = prisma.vehicleHasDrivingAid.deleteMany({
        where: {
            vehicle: {
                owner: {
                    uuid: userUuid
                }
            }
        }
    });

    const deletedCarAdverts = prisma.vehicleAdvert.deleteMany({
        where: {
            owner: {
                uuid: userUuid
            }
        }
    });

    const deletedMessages = prisma.message.deleteMany({
        where: {
            OR: [
                {
                    fromUserUuid: userUuid
                },
                {
                    toUserUuid: userUuid
                }
            ]
        }
    });

    const deletedUser = prisma.user.delete({
        where: {
            uuid: userUuid
        }
    });

    const transaction = await prisma.$transaction([
        deletedDrivingAidRelations,
        deletedVehicleImages,
        deletedCarAdverts,
        deletedMessages,
        deletedUser
    ]);

    await prisma.$disconnect();
    return Promise.resolve(transaction);
};
