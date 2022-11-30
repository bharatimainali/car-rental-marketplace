const {
    getRouteConfig
} = require('../../../modules/queryHandler/getRouteConfig');

describe('[Website.Load] → getRouteConfig function test', () => {
    test('[Website.Load] → Expect / route to return object with properties', (done) => {
        getRouteConfig('/').then((config) => {
            expect(config).toBeDefined();
            expect(config.siteConfig).toBeDefined();
            expect(config.pageConfig).toBeDefined();
            expect(config.pageConfig.route).toBe('/');
            return done();
        });
    });

    test('[Website.Load] → Expect /adverts route to return object with properties', (done) => {
        getRouteConfig('/adverts').then((config) => {
            expect(config).toBeDefined();
            expect(config.siteConfig).toBeDefined();
            expect(config.pageConfig).toBeDefined();
            expect(config.pageConfig.route).toBe('/adverts');
            return done();
        });
    });

    test('[Website.Load] → Expect /adverts/new route to return object with properties', (done) => {
        getRouteConfig('/adverts/new').then((config) => {
            expect(config).toBeDefined();
            expect(config.siteConfig).toBeDefined();
            expect(config.pageConfig).toBeDefined();
            expect(config.pageConfig.route).toBe('/adverts/new');
            return done();
        });
    });

    test('[Website.Load] → Expect /login route to return object with properties', (done) => {
        getRouteConfig('/login').then((config) => {
            expect(config).toBeDefined();
            expect(config.siteConfig).toBeDefined();
            expect(config.pageConfig).toBeDefined();
            expect(config.pageConfig.route).toBe('/login');
            return done();
        });
    });

    test('[Website.Load] → Expect /messages route to return object with properties', (done) => {
        getRouteConfig('/messages').then((config) => {
            expect(config).toBeDefined();
            expect(config.siteConfig).toBeDefined();
            expect(config.pageConfig).toBeDefined();
            expect(config.pageConfig.route).toBe('/messages');
            return done();
        });
    });

    test('[Website.Load] → Expect /profile route to return object with properties', (done) => {
        getRouteConfig('/profile').then((config) => {
            expect(config).toBeDefined();
            expect(config.siteConfig).toBeDefined();
            expect(config.pageConfig).toBeDefined();
            expect(config.pageConfig.route).toBe('/profile');
            return done();
        });
    });

    test('[Website.Load] → Expect invalid route to fail', (done) => {
        getRouteConfig('').catch((e) => {
            expect(e).toBeDefined();
            return done();
        });
    });
});
