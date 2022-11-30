const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

exports.registerNewUser = async function (req) {
    let params = req.body;

    if (
        typeof params.email != 'string' ||
        typeof params.phone != 'string' ||
        typeof params.firstName != 'string' ||
        typeof params.lastName != 'string'
    ) {
        return Promise.reject(null);
    }

    let newUser = await prisma.user.create({
        data: {
            uuid: uuidv4(),
            email: params.email,
            phone: params.phone,
            firstName: params.firstName,
            lastName: params.lastName,
            profileImageFileLocation: '/uploads/profileImage.webp',
            userType: {
                connect: {
                    type: 'User'
                }
            }
        }
    });

    await prisma.$disconnect();
    return Promise.resolve(newUser);
};
