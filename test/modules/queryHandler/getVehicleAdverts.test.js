const {
    getVehicleAdverts
} = require('../../../modules/queryHandler/getVehicleAdverts');

describe('[System.GetData.VehicleAdverts] → getVehicleAdverts function test', () => {
    test('[System.GetData.VehicleAdverts] → Expect function to return successfully with no filter', (done) => {
        const req = {
            query: {}
        };

        getVehicleAdverts(req).then((adverts) => {
            expect(adverts).toBeDefined();
            expect(adverts.length >= 1).toBe(true);
            return done();
        });
    });

    test('[Search.Filter] → Expect function to return successfully with filter on searchBox', (done) => {
        const search = 'RomSliG'.toLowerCase();
        const req = {
            query: {
                searchBox: search
            }
        };

        getVehicleAdverts(req).then((adverts) => {
            expect(adverts).toBeDefined();
            expect(adverts.length >= 1).toBe(true);
            expect(
                adverts[0].advertTitleSearch.includes(search) ||
                    adverts[0].advertDescriptionSearch.includes(search) ||
                    adverts[0].brand.includes(search)
            ).toBe(true);
            return done();
        });
    });

    test('[Search.Filter] → Expect function to return successfully with filter on priceFrom', (done) => {
        const priceFrom = 40;
        const req = {
            query: {
                priceFrom: priceFrom
            }
        };

        getVehicleAdverts(req).then((adverts) => {
            expect(adverts).toBeDefined();
            expect(adverts.length >= 1).toBe(true);
            expect(adverts[0].costPerHourInNok).toBeGreaterThanOrEqual(
                priceFrom
            );
            return done();
        });
    });

    test('[Search.Filter] → Expect function to return successfully with filter on priceTo', (done) => {
        const priceTo = 60;
        const req = {
            query: {
                priceTo: priceTo
            }
        };

        getVehicleAdverts(req).then((adverts) => {
            expect(adverts).toBeDefined();
            expect(adverts.length >= 1).toBe(true);
            expect(adverts[0].costPerHourInNok).toBeLessThanOrEqual(priceTo);
            return done();
        });
    });

    test('[Search.Filter] → Expect function to return successfully with filter on fuelType', (done) => {
        const fuelType = 'Elektrisk';
        const req = {
            query: {
                fuelType: fuelType
            }
        };

        getVehicleAdverts(req).then((adverts) => {
            expect(adverts).toBeDefined();
            expect(adverts.length >= 1).toBe(true);
            expect(adverts[0].fuelType.description).toBe(fuelType);
            return done();
        });
    });

    test('[Search.Filter] → Expect function to return successfully with filter on seatAmount', (done) => {
        const seatAmount = 6;
        const req = {
            query: {
                seatAmount: seatAmount
            }
        };

        getVehicleAdverts(req).then((adverts) => {
            expect(adverts).toBeDefined();
            expect(adverts.length >= 1).toBe(true);
            expect(adverts[0].seatAmount).toBeGreaterThanOrEqual(seatAmount);
            return done();
        });
    });

    test('[Search.Filter] → Expect function to return successfully with filter on brand', (done) => {
        const brand = 'Toyota';
        const req = {
            query: {
                brand: brand
            }
        };

        getVehicleAdverts(req).then((adverts) => {
            expect(adverts).toBeDefined();
            expect(adverts.length >= 1).toBe(true);
            expect(adverts[0].brand).toBe(brand);
            return done();
        });
    });
});
