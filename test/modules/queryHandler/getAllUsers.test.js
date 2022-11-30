const { getAllUsers } = require('../../../modules/queryHandler/getAllUsers');

describe('[System.GetData.AllUsers] → getAllUsers function test', () => {
    test('[System.GetData.AllUsers] → Expect function to return successfully with data', (done) => {
        getAllUsers().then((users) => {
            expect(users).toBeDefined();
            expect(users.length >= 5).toBe(true);
            return done();
        });
    });
});
