const request = require('supertest');
const app = require('../../app');
const agent = request.agent(app);

const {
    deleteUserByUuid
} = require('../../modules/requestParser/deleteUserByUuid');
const {
    getUserFromEmail
} = require('../../modules/queryHandler/getUserFromEmail');
const {
    getVehicleAdvertByRegistrationNumber
} = require('../../modules/queryHandler/getVehicleAdvertByRegistrationNumber');

let vehicleAdvertUuid = '';

describe('[UserProfile.Login] → Expect login sessions to work', () => {
    test('[UserProfile.Login] → Get a 302 Found Unauthorized response on POST /login with undefined userUuid', (done) => {
        agent
            .post('/login')
            .type('form')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.Login] → Get a 302 Found Unauthorized response on POST /login with invalid userUuid', (done) => {
        agent
            .post('/login')
            .type('form')
            .send({
                userUuid: '00000000-0000-0000-0000-000000000000'
            })
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.Login] → Get a 302 Found response on POST /login with valid userUuid', (done) => {
        agent
            .post('/login')
            .type('form')
            .send({
                userUuid: '93f8f50e-fa2b-457e-8713-947283d8141c'
            })
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.Login] → Get a 302 Found response on GET /login when already logged in', (done) => {
        agent
            .get('/login')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});

describe('[Website.Load] → Expect correct HTTP response on routes', () => {
    // Tests from here have agent keep session cookie from POST /login.
    // Requests from here will be made as logged in.
    test('[Website.Load] → Get a 404 not found response on GET /NonExistingRoute', (done) => {
        agent
            .get('/NonExistingRoute')
            .expect(404)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /', (done) => {
        agent
            .get('/')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.ViewProfile] → Get a 200 OK response on GET /profile', (done) => {
        agent
            .get('/profile')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.ViewProfile] → Get a 200 OK response on GET /profile with valid userUuid', (done) => {
        agent
            .get('/profile/93f8f50e-fa2b-457e-8713-947283d8141c')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.ViewProfile] → Get a 404 Not Found response on GET /profile with invalid userUuid', (done) => {
        agent
            .get('/profile/00000000-0000-0000-0000-000000000000')
            .expect(404)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Messaging.ViewMultipleMessages] → Get a 200 OK response on GET /messages', (done) => {
        agent
            .get('/messages')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Messaging.ViewMultipleMessages] → Get a 200 OK response on GET /messages/:uuid with valid uuid', (done) => {
        agent
            .get('/messages/5eb42e5c-a441-4b90-a4a8-d8682182b03d')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Messaging.ViewMultipleMessages] → Get a 200 OK response on GET /messages/:uuid with valid uuid without prior conversation', (done) => {
        agent
            .get('/messages/efff59dd-c87e-4bac-8878-0b51dc127a2d')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Messaging.ViewMultipleMessages] → Get a 404 Not Found response on GET /messages/:uuid with invalid uuid', (done) => {
        agent
            .get('/messages/00000000-0000-0000-0000-000000000000')
            .expect(404)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Search.List] → Get a 200 OK response on GET /adverts', (done) => {
        agent
            .get('/adverts')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Search.ViewDetails] → Get a 200 OK response on GET /adverts with valid vehicleAdvert uuid', (done) => {
        agent
            .get('/adverts/e908d9ac-27d3-46b2-8401-b876d0443d22')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[CarAdvertManagement.Edit] → Get a 200 OK response on GET /adverts/:uuid/edit with valid vehicleAdvert uuid when logged in', (done) => {
        agent
            .get('/adverts/e908d9ac-27d3-46b2-8401-b876d0443d22/edit')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Search.ViewDetails] → Get a 404 Not Found response on GET /adverts with invalid vehicleAdvert uuid', (done) => {
        agent
            .get('/adverts/00000000-0000-0000-0000-000000000000')
            .expect(404)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[CarAdvertManagement.Add] → Get a 200 OK response on GET /adverts/new', (done) => {
        agent
            .get('/adverts/new')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[CarAdvertManagement.Add] → Be able to create new advert with POST /adverts/new when logged in', (done) => {
        agent
            .post('/adverts/new')
            .type('form')
            .send({
                registrationNumber: 'TEST 54321',
                licenseClass: 'B',
                fuelType: 'Electric',
                transmissionType: 'Automatic',
                wheelDriveType: 'Front wheel drive',
                streetAddress: 'Leiebilveien 123',
                city: 'Bilbyen',
                postalCode: '9999',
                seatAmount: '4',
                brand: 'Merkebil',
                model: 'Modellen',
                modelYear: '2020',
                weightInKg: '1500',
                mileageInKm: '25000',
                color: 'Hvit',
                costPerHourInNok: '200',
                advertTitle: 'Beste bilen i verden',
                advertDescription: 'Lei denne bilen om du vil kjøre fort',
                hasHitch: 'on',
                isPublished: 'on'
            })
            .end(async () => {
                const vehicleAdvert =
                    await getVehicleAdvertByRegistrationNumber('TEST 54321');
                expect(vehicleAdvert).toBeDefined();
                expect(vehicleAdvert.uuid).toBeDefined();
                expect(vehicleAdvert.registrationNumber).toBe('TEST 54321');
                expect(vehicleAdvert.licenseClassId).toBe(1);
                expect(vehicleAdvert.fuelTypeId).toBe(3);
                expect(vehicleAdvert.transmissionTypeId).toBe(2);
                expect(vehicleAdvert.wheelDriveTypeId).toBe(2);
                expect(vehicleAdvert.streetAddress).toBe('Leiebilveien 123');
                expect(vehicleAdvert.city).toBe('Bilbyen');
                expect(vehicleAdvert.postalCode).toBe('9999');
                expect(vehicleAdvert.seatAmount).toBe(4);
                expect(vehicleAdvert.brand).toBe('Merkebil');
                expect(vehicleAdvert.model).toBe('Modellen');
                expect(vehicleAdvert.modelYear).toBe(2020);
                expect(vehicleAdvert.weightInKg).toBe(1500);
                expect(vehicleAdvert.mileageInKm).toBe(25000);
                expect(vehicleAdvert.color).toBe('Hvit');
                expect(vehicleAdvert.costPerHourInNok).toBe(200);
                expect(vehicleAdvert.advertTitle).toBe('Beste bilen i verden');
                expect(vehicleAdvert.advertTitleSearch).toBe(
                    'beste bilen i verden'
                );
                expect(vehicleAdvert.advertDescription).toBe(
                    'Lei denne bilen om du vil kjøre fort'
                );
                expect(vehicleAdvert.advertDescriptionSearch).toBe(
                    'lei denne bilen om du vil kjøre fort'
                );
                expect(vehicleAdvert.hasHitch).toBe(true);
                expect(vehicleAdvert.isPublished).toBe(true);

                vehicleAdvertUuid = vehicleAdvert.uuid;

                return done();
            });
    });

    test('[CarAdvertManagement.Edit] → Be able to edit advert with POST /adverts/:uuid/edit when logged in', (done) => {
        agent
            .post('/adverts/' + vehicleAdvertUuid + '/edit')
            .type('form')
            .send({
                registrationNumber: 'TEST 54321',
                licenseClass: 'B',
                fuelType: 'Electric',
                transmissionType: 'Automatic',
                wheelDriveType: 'Front wheel drive',
                streetAddress: 'Leiebilveien 123',
                city: 'Bilbyen',
                postalCode: '9999',
                seatAmount: '4',
                brand: 'Merkebil',
                model: 'Modellen 2',
                modelYear: '2020',
                weightInKg: '1500',
                mileageInKm: '25000',
                color: 'Hvit',
                costPerHourInNok: '200',
                advertTitle: 'Beste bilen i verden',
                advertDescription: 'Lei denne bilen om du vil kjøre fort',
                hasHitch: 'on',
                isPublished: 'on'
            })
            .end(async () => {
                const vehicleAdvert =
                    await getVehicleAdvertByRegistrationNumber('TEST 54321');
                expect(vehicleAdvert).toBeDefined();
                expect(vehicleAdvert.uuid).toBeDefined();
                expect(vehicleAdvert.registrationNumber).toBe('TEST 54321');
                expect(vehicleAdvert.licenseClassId).toBe(1);
                expect(vehicleAdvert.fuelTypeId).toBe(3);
                expect(vehicleAdvert.transmissionTypeId).toBe(2);
                expect(vehicleAdvert.wheelDriveTypeId).toBe(2);
                expect(vehicleAdvert.streetAddress).toBe('Leiebilveien 123');
                expect(vehicleAdvert.city).toBe('Bilbyen');
                expect(vehicleAdvert.postalCode).toBe('9999');
                expect(vehicleAdvert.seatAmount).toBe(4);
                expect(vehicleAdvert.brand).toBe('Merkebil');
                expect(vehicleAdvert.model).toBe('Modellen 2');
                expect(vehicleAdvert.modelYear).toBe(2020);
                expect(vehicleAdvert.weightInKg).toBe(1500);
                expect(vehicleAdvert.mileageInKm).toBe(25000);
                expect(vehicleAdvert.color).toBe('Hvit');
                expect(vehicleAdvert.costPerHourInNok).toBe(200);
                expect(vehicleAdvert.advertTitle).toBe('Beste bilen i verden');
                expect(vehicleAdvert.advertTitleSearch).toBe(
                    'beste bilen i verden'
                );
                expect(vehicleAdvert.advertDescription).toBe(
                    'Lei denne bilen om du vil kjøre fort'
                );
                expect(vehicleAdvert.advertDescriptionSearch).toBe(
                    'lei denne bilen om du vil kjøre fort'
                );
                expect(vehicleAdvert.hasHitch).toBe(true);
                expect(vehicleAdvert.isPublished).toBe(true);

                return done();
            });
    });

    test('[CarAdvertManagement.Delete] → Be able to delete advert with GET /adverts/:uuid/delete when logged in', (done) => {
        agent.get('/adverts/' + vehicleAdvertUuid + '/delete').end(async () => {
            const vehicleAdvert = await getVehicleAdvertByRegistrationNumber(
                'TEST 54321'
            );

            expect(vehicleAdvert).toBe(null);
            return done();
        });
    });

    // After GET /logout, agent will no longer be logged in.
    // Requests from here will be made as logged out.
    test('[UserProfile.Logout] → Get a 302 Found response on GET /logout', (done) => {
        agent
            .get('/logout')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on GET /profile when logged out', (done) => {
        agent
            .get('/profile')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on GET /messages when logged out', (done) => {
        agent
            .get('/messages')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on GET /adverts/new when logged out', (done) => {
        agent
            .get('/adverts/new')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on POST /adverts/new when logged out', (done) => {
        agent
            .post('/adverts/new')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on GET /messages/:uuid when logged out', (done) => {
        agent
            .get('/messages/5eb42e5c-a441-4b90-a4a8-d8682182b03d')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on POST /messages/send when logged out', (done) => {
        agent
            .post('/messages/send')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on POST /advert/:uuid/edit when logged out', (done) => {
        agent
            .post('/adverts/' + vehicleAdvertUuid + '/edit')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on GET /advert/:uuid/delete when logged out', (done) => {
        agent
            .get('/adverts/' + vehicleAdvertUuid + '/delete')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 302 Found response on POST /messages/send when logged out', (done) => {
        agent
            .post('/messages/send')
            .expect(302)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.NoUserProfile] → Get a 200 OK response on GET /login when logged out', (done) => {
        agent
            .get('/login')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[UserProfile.CreateProfile] → Be able to create new user with POST /login/register when logged out', (done) => {
        agent
            .post('/login/register')
            .type('form')
            .send({
                email: 'test2@test.no',
                phone: '+47 87654321',
                firstName: 'firstNameTest',
                lastName: 'lastNameTest'
            })
            .end(async () => {
                const user = await getUserFromEmail('test2@test.no');
                expect(user).toBeDefined();
                expect(user.email).toBe('test2@test.no');
                expect(user.phone).toBe('+47 87654321');
                expect(user.firstName).toBe('firstNameTest');
                expect(user.lastName).toBe('lastNameTest');
                await deleteUserByUuid(user.uuid).then(() => {
                    return done();
                });
            });
    });
});

describe('[Website.Load] → Expect 200 OK for static resources', () => {
    test('[Website.Load] → Get a 200 OK response on GET /stylesheets/style.css', (done) => {
        agent
            .get('/stylesheets/style.css')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /favicon.ico', (done) => {
        agent
            .get('/favicon.ico')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /stylesheets/fontawesome-all.min.css', (done) => {
        agent
            .get('/stylesheets/fontawesome-all.min.css')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /webfonts/Manrope-Regular.ttf', (done) => {
        agent
            .get('/webfonts/Manrope-Regular.ttf')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /webfonts/Manrope-Medium.ttf', (done) => {
        agent
            .get('/webfonts/Manrope-Medium.ttf')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /webfonts/Manrope-SemiBold.ttf', (done) => {
        agent
            .get('/webfonts/Manrope-SemiBold.ttf')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /webfonts/Manrope-Bold.ttf', (done) => {
        agent
            .get('/webfonts/Manrope-Bold.ttf')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/mainPageCoverImage.webp', (done) => {
        agent
            .get('/uploads/mainPageCoverImage.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/advertPlaceholderImage.webp', (done) => {
        agent
            .get('/uploads/advertPlaceholderImage.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/profileImage.webp', (done) => {
        agent
            .get('/uploads/profileImage.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/1be1aa29-88dd-468b-9514-f6ad0b82c360_1.webp', (done) => {
        agent
            .get('/uploads/1be1aa29-88dd-468b-9514-f6ad0b82c360_1.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/4bea56b5-8142-4e94-abef-c01850032262_1.webp', (done) => {
        agent
            .get('/uploads/4bea56b5-8142-4e94-abef-c01850032262_1.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/8b3035a6-287e-4166-9816-41122b64f796_1.webp', (done) => {
        agent
            .get('/uploads/8b3035a6-287e-4166-9816-41122b64f796_1.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/d87b694f-dab0-47d0-959d-e27c6ff5f979_1.webp', (done) => {
        agent
            .get('/uploads/d87b694f-dab0-47d0-959d-e27c6ff5f979_1.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/e908d9ac-27d3-46b2-8401-b876d0443d22_1.webp', (done) => {
        agent
            .get('/uploads/e908d9ac-27d3-46b2-8401-b876d0443d22_1.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });

    test('[Website.Load] → Get a 200 OK response on GET /uploads/ef54c465-33ad-40ee-83b0-43d1beb07ec1_1.webp', (done) => {
        agent
            .get('/uploads/ef54c465-33ad-40ee-83b0-43d1beb07ec1_1.webp')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});
