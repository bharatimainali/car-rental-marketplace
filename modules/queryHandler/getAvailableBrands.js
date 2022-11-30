const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAvailableBrands = async function () {
    let brands = await prisma.vehicleAdvert.groupBy({
        by: ['brand']
    });

    return Promise.resolve(brands);
};
