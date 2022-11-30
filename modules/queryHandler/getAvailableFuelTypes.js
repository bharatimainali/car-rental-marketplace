const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAvailableFuelTypes = async function () {
    let fuelTypes = await prisma.fuelType.groupBy({
        by: ['description']
    });

    return Promise.resolve(fuelTypes);
};
