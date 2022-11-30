const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUsers = async function () {
    let users = await prisma.user.findMany({
        orderBy: {
            firstName: 'desc'
        },
        include: {
            vehicleAdverts: true,
            userType: true,
            sentMessages: true,
            receivedMessages: true
        }
    });

    return Promise.resolve(users);
};
