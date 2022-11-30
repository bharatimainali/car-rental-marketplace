const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.sendNewMessage = async function (req) {
    let params = req.body;

    if (
        typeof params.fromUserUuid != 'string' ||
        typeof params.toUserUuid != 'string' ||
        typeof params.content != 'string' ||
        params.content.trim() === ''
    ) {
        return Promise.reject(null);
    }

    let newMessage = await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: params.fromUserUuid
                }
            },
            toUser: {
                connect: {
                    uuid: params.toUserUuid
                }
            },
            content: params.content
        }
    });

    await prisma.$disconnect();
    return Promise.resolve(newMessage);
};
