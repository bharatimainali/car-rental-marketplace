const {
    registerNewUser
} = require('../../../modules/requestParser/registerNewUser');
const {
    deleteUserByUuid
} = require('../../../modules/requestParser/deleteUserByUuid');
const {
    getUserFromUuid
} = require('../../../modules/queryHandler/getUserFromUuid');

let user = {};

describe('[UserProfile] → user management functions test', () => {
    test('[UserProfile.CreateProfile] → Expect user data stored in database to be correct after creating new user', (done) => {
        let req = {
            body: {
                email: 'test@test.no',
                phone: '+47 12345678',
                firstName: 'firstNameTest',
                lastName: 'lastNameTest'
            }
        };

        registerNewUser(req).then((newUser) => {
            expect(newUser).toBeDefined();
            expect(newUser.uuid).toBeDefined();
            expect(newUser.createdTimestamp).toBeDefined();
            expect(newUser.email).toBe('test@test.no');
            expect(newUser.phone).toBe('+47 12345678');
            expect(newUser.firstName).toBe('firstNameTest');
            expect(newUser.lastName).toBe('lastNameTest');
            user = newUser;
            return done();
        });
    });

    test('[UserProfile.DeleteProfile] → Expect to be able to delete newly made users', (done) => {
        deleteUserByUuid(user.uuid).then(async () => {
            await getUserFromUuid(user.uuid).catch((e) => {
                expect(e).toBe(null);
            });

            return done();
        });
    });
});
