const {
    createVehicleAdvert
} = require('../../../modules/requestParser/createVehicleAdvert');
const {
    deleteVehicleAdvertByUuid
} = require('../../../modules/requestParser/deleteVehicleAdvertByUuid');
const {
    getVehicleAdvertByUuid
} = require('../../../modules/queryHandler/getVehicleAdvertByUuid');
const {
    getOwnVehicleAdvertByUuid
} = require('../../../modules/queryHandler/getOwnVehicleAdvertByUuid');
const {
    getVehicleAdvertsByUserUuid
} = require('../../../modules/queryHandler/getVehicleAdvertsByUserUuid');

let user = {
    uuid: '45f1fab3-4da4-4fb3-af6e-cbfba6f4ae7d' // admin
};
let vehicleAdvertUuid = '';

describe('[CarAdvertManagement] → vehicleAdvert management functions test', () => {
    test('[CarAdvertManagement.Add] → Expect advert data stored in database to be correct after creating new advert', (done) => {
        let req = {
            body: {
                registrationNumber: 'TEST 12345',
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
            },
            files: [
                {
                    fileName: 'bilde1.png'
                },
                {
                    fileName: 'bilde2.jpg'
                },
                {
                    fileName: 'bilde3.webp'
                }
            ]
        };

        createVehicleAdvert(user, req).then((vehicleAdvert) => {
            expect(vehicleAdvert).toBeDefined();
            expect(vehicleAdvert.uuid).toBeDefined();
            expect(vehicleAdvert.registrationNumber).toBe('TEST 12345');
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

    test('[System.GetData.VehicleAdverts] → Expect to be able to get newly made vehicleAdvert by uuid', (done) => {
        getVehicleAdvertByUuid(vehicleAdvertUuid).then((vehicleAdvert) => {
            expect(vehicleAdvert).toBeDefined();
            expect(vehicleAdvert.vehicleImages.length > 1).toBe(true);
            return done();
        });

        getOwnVehicleAdvertByUuid(vehicleAdvertUuid).then((vehicleAdvert) => {
            expect(vehicleAdvert).toBeDefined();
            expect(vehicleAdvert.vehicleImages.length > 1).toBe(true);
            return done();
        });
    });

    test('[CarAdvertManagement.Remove] → Expect to be able to delete newly made vehicleAdvert', (done) => {
        deleteVehicleAdvertByUuid(vehicleAdvertUuid).then(async () => {
            let userAdverts = await getVehicleAdvertsByUserUuid(user.uuid);
            expect(userAdverts.length).toEqual(0);

            await getOwnVehicleAdvertByUuid(vehicleAdvertUuid).catch((e) => {
                expect(e).toBe(null);
            });

            return done();
        });
    });

    test('[CarAdvertManagement.Add] → Expect advert to be created correctly when isPublished = off', (done) => {
        let req = {
            body: {
                registrationNumber: 'TEST 12321',
                licenseClass: 'B',
                fuelType: 'Electric',
                transmissionType: 'Automatic',
                wheelDriveType: 'Front wheel drive',
                seatAmount: '4',
                costPerHourInNok: '200',
                advertTitle: 'Beste bilen i verden',
                advertDescription: 'Lei denne bilen om du vil kjøre fort',
                hasHitch: 'on',
                isPublished: 'off'
            }
        };

        createVehicleAdvert(user, req).then((vehicleAdvert) => {
            expect(vehicleAdvert).toBeDefined();
            expect(vehicleAdvert.uuid).toBeDefined();
            expect(vehicleAdvert.registrationNumber).toBe('TEST 12321');
            expect(vehicleAdvert.licenseClassId).toBe(1);
            expect(vehicleAdvert.fuelTypeId).toBe(3);
            expect(vehicleAdvert.transmissionTypeId).toBe(2);
            expect(vehicleAdvert.wheelDriveTypeId).toBe(2);
            expect(vehicleAdvert.seatAmount).toBe(4);
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
            expect(vehicleAdvert.isPublished).toBe(false);
            vehicleAdvertUuid = vehicleAdvert.uuid;
            return done();
        });
    });

    test('[System.GetData.VehicleAdverts] → Expect to not be able to get newly made vehicleAdvert when isPublished false', (done) => {
        getVehicleAdvertByUuid(vehicleAdvertUuid).catch(() => {
            return done();
        });
    });

    test('[CarAdvertManagement.Remove] → Expect to be able to delete vehicleAdvert with isPublished false', (done) => {
        deleteVehicleAdvertByUuid(vehicleAdvertUuid).then(async () => {
            return done();
        });
    });
});
