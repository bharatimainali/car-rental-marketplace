var express = require('express');
var router = express.Router();

/* Importing custom modules */
const { getRouteConfig } = require('../modules/queryHandler/getRouteConfig');
const { getLoggedInUser } = require('../modules/queryHandler/getLoggedInUser');
const { getAllUsers } = require('../modules/queryHandler/getAllUsers');
const { registerNewUser } = require('../modules/requestParser/registerNewUser');
const {
    processLoginRequest
} = require('../modules/queryHandler/processLoginRequest');

/* GET /login */
router.get('/', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/login');
    const user = await getLoggedInUser(req);

    if (user) {
        return res.redirect('/');
    } else {
        const users = await getAllUsers();
        res.render('login', { routeConfig, user, users });
    }
});

router.post('/', async (req, res, next) => {
    await processLoginRequest(req)
        .then(() => {
            return res.redirect('/adverts');
        })
        .catch(() => {
            return res.redirect('/login');
        });
});

router.post('/register', async (req, res, next) => {
    let newUser = await registerNewUser(req);
    req.body.userUuid = newUser.uuid;

    processLoginRequest(req)
        .then(() => {
            return res.redirect('/adverts');
        })
        .catch(() => {
            return res.redirect('/login');
        });
});

module.exports = router;
