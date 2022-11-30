const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getConversationsForUser = async function (uuid) {
    let messages = await prisma.message.findMany({
        orderBy: {
            sentTimestamp: 'asc'
        },
        where: {
            OR: [
                {
                    fromUserUuid: uuid
                },
                {
                    toUserUuid: uuid
                }
            ]
        },
        include: {
            fromUser: true,
            toUser: true
        }
    });

    let conversations = [];

    messages.forEach((message) => {
        let conversation = {
            id: '',
            with: '',
            messages: []
        };
        let withUser = {};
        if (message.fromUserUuid !== uuid) {
            withUser = message.fromUser;
        } else if (message.toUserUuid !== uuid) {
            withUser = message.toUser;
        }

        if (
            conversations.some((convo) => {
                return convo.id === withUser.uuid;
            })
        ) {
            const index = conversations.findIndex((convo) => {
                return convo.id === withUser.uuid;
            });
            conversations[index].messages.push(message);
        } else {
            conversation.id = withUser.uuid;
            conversation.with = withUser.firstName + ' ' + withUser.lastName;
            conversation.messages.push(message);
            conversations.push(conversation);
        }
    });

    await prisma.$disconnect();
    return Promise.resolve(conversations);
};
