var express = require('express');
var router = express.Router();
const createError = require('http-errors');

/* Importing custom modules */
const { getRouteConfig } = require('../modules/queryHandler/getRouteConfig');
const { getLoggedInUser } = require('../modules/queryHandler/getLoggedInUser');
const { getUserFromUuid } = require('../modules/queryHandler/getUserFromUuid');
const {
    getVehicleAdvertsByUserUuid
} = require('../modules/queryHandler/getVehicleAdvertsByUserUuid');
const {
    getOwnVehicleAdvertsByUserUuid
} = require('../modules/queryHandler/getOwnVehicleAdvertsByUserUuid');

/* GET /profile */
router.get('/', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/profile');
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    let profileUser = user;

    let vehicleAdverts = await getOwnVehicleAdvertsByUserUuid(user.uuid);

    res.render('profile', {
        routeConfig,
        user,
        profileUser,
        vehicleAdverts
    });
});

router.get('/:uuid', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/profile');
    const user = await getLoggedInUser(req);

    let profileUser = await getUserFromUuid(req.params.uuid);

    if (!profileUser) {
        return next(createError(404));
    }

    let vehicleAdverts = await getVehicleAdvertsByUserUuid(profileUser.uuid);

    res.render('profile', {
        routeConfig,
        user,
        profileUser,
        vehicleAdverts
    });
});

module.exports = router;
