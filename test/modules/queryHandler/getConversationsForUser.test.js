const {
    getConversationsForUser
} = require('../../../modules/queryHandler/getConversationsForUser');

describe('[System.GetData.ConversationsForUser] → function test', () => {
    test('[System.GetData.ConversationsForUser] → Expect function to return successfully with data', (done) => {
        getConversationsForUser('efff59dd-c87e-4bac-8878-0b51dc127a2d').then(
            (conversations) => {
                expect(conversations).toBeDefined();
                expect(conversations.length >= 1).toBe(true);
                return done();
            }
        );
    });

    test('[System.GetData.ConversationsForUser] → Expect function to return successfully with data', (done) => {
        getConversationsForUser('92d2e850-0f5d-40e1-b004-be33a0aff763').then(
            (conversations) => {
                expect(conversations).toBeDefined();
                expect(conversations.length >= 1).toBe(true);
                return done();
            }
        );
    });

    test('[System.GetData.ConversationsForUser] → Expect 0 conversations returned on invalid userUuid', (done) => {
        getConversationsForUser('00000000-0000-0000-0000-000000000000').then(
            (conversations) => {
                expect(conversations).toBeDefined();
                expect(conversations.length === 0).toBe(true);
                return done();
            }
        );
    });
});
