const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getRouteConfig = async function (routeName) {
    let routeConfig = {};

    await prisma.siteConfig
        .findFirstOrThrow()
        .then(async (siteConfig) => {
            await prisma.pageConfig
                .findFirstOrThrow({
                    where: {
                        route: routeName
                    }
                })
                .then((pageConfig) => {
                    routeConfig.siteConfig = siteConfig;
                    routeConfig.pageConfig = pageConfig;
                });
        })
        .catch(async (err) => {
            await prisma.$disconnect();
            return Promise.reject(err);
        });

    await prisma.$disconnect();

    return Promise.resolve(routeConfig);
};
