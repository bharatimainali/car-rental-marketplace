const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

/* Importing custom modules */
const { getRouteConfig } = require('../modules/queryHandler/getRouteConfig');
const { getLoggedInUser } = require('../modules/queryHandler/getLoggedInUser');
const {
    getVehicleAdvertByUuid
} = require('../modules/queryHandler/getVehicleAdvertByUuid');
const {
    getOwnVehicleAdvertByUuid
} = require('../modules/queryHandler/getOwnVehicleAdvertByUuid');
const {
    getVehicleAdverts
} = require('../modules/queryHandler/getVehicleAdverts');
const {
    createVehicleAdvert
} = require('../modules/requestParser/createVehicleAdvert');
const {
    getAvailableBrands
} = require('../modules/queryHandler/getAvailableBrands');
const {
    getAvailableFuelTypes
} = require('../modules/queryHandler/getAvailableFuelTypes');
const {
    deleteVehicleAdvertByUuid
} = require('../modules/requestParser/deleteVehicleAdvertByUuid');

var multer = require('multer');
const {
    editVehicleAdvertByUuid
} = require('../modules/requestParser/editVehicleAdvertByUuid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = './uploads/vehicleImages/';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                '-' +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    }
});

const upload = multer({
    storage: storage
});

/* GET /cars */
router.get('/', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/adverts');
    const user = await getLoggedInUser(req);

    let vehicleAdverts = await getVehicleAdverts(req);
    let brands = await getAvailableBrands();
    let fuelTypes = await getAvailableFuelTypes();
    let queryParams = req.query;

    res.render('adverts', {
        routeConfig,
        user,
        vehicleAdverts,
        fuelTypes,
        brands,
        queryParams
    });
});

// page for adding new vehicle
router.get('/new', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/adverts/new');
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    res.render('newadvert', { routeConfig, user });
});

// post to create new vehicle advert
router.post('/new', upload.array('vehicleImages'), async (req, res, next) => {
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    let newAdvert = await createVehicleAdvert(user, req);
    res.redirect(newAdvert.uuid); // redirect to newly created car advert on post successful
});

// get unique vehicle, show vehicle advert details view
router.get('/:uuid', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/adverts');
    const user = await getLoggedInUser(req);

    await getVehicleAdvertByUuid(req.params.uuid, req)
        .then((vehicleAdvert) => {
            res.render('advert', { routeConfig, user, vehicleAdvert });
        })
        .catch(async () => {
            return next(createError(404));
        });
});

// page for editing advert
router.get('/:uuid/edit', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/adverts/edit');
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    await getOwnVehicleAdvertByUuid(req.params.uuid, user.uuid)
        .then((vehicleAdvert) => {
            if (vehicleAdvert.ownerUuid === user.uuid) {
                return res.render('editadvert', {
                    routeConfig,
                    user,
                    vehicleAdvert
                });
            } else {
                return res.redirect('/profile/' + vehicleAdvert.ownerUuid);
            }
        })
        .catch(async () => {
            return next(createError(404));
        });
});

// post to create new vehicle advert
router.post(
    '/:uuid/edit',
    upload.array('vehicleImages'),
    async (req, res, next) => {
        const user = await getLoggedInUser(req);

        if (!user) {
            return res.redirect('../login');
        }

        await getOwnVehicleAdvertByUuid(req.params.uuid, user.uuid)
            .then(async (vehicleAdvert) => {
                if (vehicleAdvert.ownerUuid === user.uuid) {
                    let editedAdvert = await editVehicleAdvertByUuid(
                        vehicleAdvert.uuid,
                        req
                    );

                    res.redirect('/adverts/' + editedAdvert.uuid);
                } else {
                    return res.redirect('/profile/' + vehicleAdvert.ownerUuid);
                }
            })
            .catch(async () => {
                return next(createError(404));
            });
    }
);

// delete car advert with uuid if belonging to logged in user
router.get('/:uuid/delete', async (req, res, next) => {
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    await getOwnVehicleAdvertByUuid(req.params.uuid, user.uuid)
        .then((vehicleAdvert) => {
            if (vehicleAdvert.ownerUuid === user.uuid) {
                deleteVehicleAdvertByUuid(vehicleAdvert.uuid).then(() => {
                    res.redirect('/profile');
                });
            } else {
                res.redirect('/profile/' + vehicleAdvert.ownerUuid);
            }
        })
        .catch(async () => {
            return next(createError(404));
        });
});

module.exports = router;
