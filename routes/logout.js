var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

/* Importing custom modules */
const { getLoggedInUser } = require('../modules/queryHandler/getLoggedInUser');

const prisma = new PrismaClient();

/* GET /logout */
router.get('/', async (req, res, next) => {
    const user = await getLoggedInUser(req);
    if (user) {
        await prisma.user.update({
            where: {
                uuid: user.uuid
            },
            data: {
                sessionId: null
            }
        });
    }

    req.session.destroy();
    res.redirect('../login');
});

module.exports = router;
