const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getVehicleAdverts = async function (req) {
    const query = req.query;

    let search = !query.searchBox ? '' : query.searchBox;
    let priceFrom = !query.priceFrom ? 0 : Number(query.priceFrom);
    let priceTo = !query.priceTo ? 999999 : Number(query.priceTo);

    let searchObject = {
        AND: [
            {
                OR: [
                    {
                        advertTitle: {
                            contains: search
                        }
                    },
                    {
                        advertDescription: {
                            contains: search
                        }
                    },
                    {
                        brand: {
                            contains: search
                        }
                    },
                    {
                        model: {
                            contains: search
                        }
                    },
                    {
                        registrationNumber: {
                            contains: search
                        }
                    }
                ]
            },
            {
                costPerHourInNok: {
                    gte: priceFrom
                }
            },
            {
                costPerHourInNok: {
                    lte: priceTo
                }
            }
        ]
    };

    if (query.fuelType && query.fuelType !== 'Alle typer') {
        searchObject.AND.push({
            fuelType: {
                description: {
                    equals: query.fuelType
                }
            }
        });
    }

    if (query.seatAmount) {
        let seats = Number(query.seatAmount);

        searchObject.AND.push({
            seatAmount: {
                gte: seats
            }
        });
    }

    if (query.brand && query.brand !== 'Alle merker') {
        searchObject.AND.push({
            brand: {
                equals: query.brand
            }
        });
    }

    let vehicleAdverts = await prisma.vehicleAdvert.findMany({
        where: searchObject,
        include: {
            fuelType: true,
            transmissionType: true,
            vehicleImages: true
        }
    });

    vehicleAdverts = vehicleAdverts.filter((advert) => {
        return advert.isPublished;
    });

    return Promise.resolve(vehicleAdverts);
};
