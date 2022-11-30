const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.deleteMessageById = async function (messageId) {
    const deletedMessages = await prisma.message.delete({
        where: {
            id: messageId
        }
    });

    await prisma.$disconnect();
    return Promise.resolve(deletedMessages);
};
