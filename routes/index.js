var express = require('express');
var router = express.Router();

/* Importing custom modules */
const { getRouteConfig } = require('../modules/queryHandler/getRouteConfig');
const { getLoggedInUser } = require('../modules/queryHandler/getLoggedInUser');

/* GET home page. */
router.get('/', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/');
    const user = await getLoggedInUser(req);

    res.render('index', { routeConfig, user });
});

module.exports = router;
