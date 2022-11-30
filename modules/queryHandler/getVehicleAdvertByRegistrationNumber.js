const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getVehicleAdvertByRegistrationNumber = async function (regNr) {
    let advert = await prisma.vehicleAdvert.findUnique({
        where: {
            registrationNumber: regNr
        }
    });

    return Promise.resolve(advert);
};
