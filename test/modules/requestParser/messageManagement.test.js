const {
    sendNewMessage
} = require('../../../modules/requestParser/sendNewMessage');
const {
    deleteMessageById
} = require('../../../modules/requestParser/deleteMessageById');
const {
    getConversationsForUser
} = require('../../../modules/queryHandler/getConversationsForUser');

let req = {
    body: {
        fromUserUuid: '2b374bf1-78fb-4ce8-8823-fc13ffba848e', // Kenneth
        toUserUuid: '45f1fab3-4da4-4fb3-af6e-cbfba6f4ae7d', // Admin
        content: 'Halla balla'
    }
};

let message = {};

describe('[Messaging] → Message management functions test', () => {
    test('[Messaging.Send] → Expect message data stored in database to be correct after sending new message', (done) => {
        sendNewMessage(req).then((newMessage) => {
            expect(newMessage).toBeDefined();
            expect(newMessage.id).toBeDefined();
            expect(newMessage.sentTimestamp).toBeDefined();
            expect(newMessage.fromUserUuid).toBe(req.body.fromUserUuid);
            expect(newMessage.toUserUuid).toBe(req.body.toUserUuid);
            expect(newMessage.content).toBe(req.body.content);
            message = newMessage;
            return done();
        });
    });

    test('[Messaging.Save] → Expect from and to user uuid to be linked to new message', (done) => {
        getConversationsForUser(message.toUserUuid).then(
            async (conversations) => {
                let convoMessage = conversations[0].messages[0];
                expect(
                    conversations.some((convo) => {
                        return convo.with === 'Kenneth Larsen';
                    })
                ).toBe(true);
                expect(convoMessage).toBeDefined();
                expect(convoMessage.id).toBeDefined();
                expect(convoMessage.fromUserUuid).toBe(req.body.fromUserUuid);
                expect(convoMessage.toUserUuid).toBe(req.body.toUserUuid);
                expect(convoMessage.content).toBe(req.body.content);
                return done();
            }
        );
    });

    test('[Messaging.Delete] → Expect to be able to delete newly sent message', (done) => {
        deleteMessageById(message.id).then(async () => {
            await getConversationsForUser(message.fromUserUuid).catch((e) => {
                expect(e).toBe(null);
            });

            return done();
        });
    });
});
