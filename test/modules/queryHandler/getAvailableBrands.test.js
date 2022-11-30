const {
    getAvailableBrands
} = require('../../../modules/queryHandler/getAvailableBrands');

describe('[System.GetData.AvailableBrands] → getAvailableBrands function test', () => {
    test('[System.GetData.AvailableBrands] → Expect function to return successfully with data', (done) => {
        getAvailableBrands().then((brands) => {
            expect(brands).toBeDefined();
            expect(brands.length >= 6).toBe(true);
            return done();
        });
    });
});
