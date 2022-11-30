const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.processLoginRequest = async function (req) {
    await prisma.user
        .findUniqueOrThrow({
            where: {
                uuid: req.body.userUuid
            }
        })
        .then(async (user) => {
            user = await prisma.user.update({
                where: {
                    uuid: user.uuid
                },
                data: {
                    sessionId: req.session.id
                }
            });

            await prisma.$disconnect();
            return Promise.resolve(user);
        })
        .catch(async (e) => {
            await prisma.$disconnect();
            return Promise.reject(e);
        });
};
