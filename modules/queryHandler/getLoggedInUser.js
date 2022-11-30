const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLoggedInUser = async function (req) {
    /*
    if (!req || !req.session || !req.session.id) {
        await prisma.$disconnect();
        return Promise.resolve(null);
    }
    */

    const user = await prisma.user
        .findUniqueOrThrow({
            where: {
                sessionId: req.session.id
            }
        })
        .catch(async () => {
            await prisma.$disconnect();
            return Promise.resolve(null);
        });

    await prisma.$disconnect();
    return Promise.resolve(user);
};
