const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserFromUuid = async function (uuid) {
    let user = await prisma.user
        .findUniqueOrThrow({
            where: {
                uuid: uuid
            }
        })
        .catch(async () => {
            await prisma.$disconnect();
            return Promise.resolve(null);
        });

    return Promise.resolve(user);
};
