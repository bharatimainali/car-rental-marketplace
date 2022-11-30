const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserFromEmail = async function (email) {
    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    return Promise.resolve(user);
};
