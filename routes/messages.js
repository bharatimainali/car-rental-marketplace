var express = require('express');
var router = express.Router();
const createError = require('http-errors');

/* Importing custom modules */
const { getRouteConfig } = require('../modules/queryHandler/getRouteConfig');
const { getLoggedInUser } = require('../modules/queryHandler/getLoggedInUser');
const { getUserFromUuid } = require('../modules/queryHandler/getUserFromUuid');
const {
    getConversationsForUser
} = require('../modules/queryHandler/getConversationsForUser');
const { sendNewMessage } = require('../modules/requestParser/sendNewMessage');

/* GET /messages */
router.get('/', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/messages');
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    await getConversationsForUser(user.uuid).then((conversations) => {
        res.render('messages', { routeConfig, user, conversations });
    });
});

router.get('/:id', async (req, res, next) => {
    const routeConfig = await getRouteConfig('/messages');
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    let activeConversationId = req.params.id;
    await getConversationsForUser(user.uuid).then(async (conversations) => {
        let convoWithUser = await getUserFromUuid(activeConversationId);
        if (!convoWithUser) {
            return next(createError(404));
        }
        if (
            !conversations.some((conversation) => {
                return conversation.id === activeConversationId;
            })
        ) {
            res.render('messages', {
                routeConfig,
                user,
                conversations,
                activeConversationId,
                convoWithUser
            });
        } else {
            res.render('messages', {
                routeConfig,
                user,
                conversations,
                activeConversationId,
                convoWithUser
            });
        }
    });
});

router.post('/send', async (req, res, next) => {
    const user = await getLoggedInUser(req);

    if (!user) {
        return res.redirect('../login');
    }

    await sendNewMessage(req)
        .then((newMessage) => {
            res.redirect(newMessage.toUserUuid + '#bottom');
        })
        .catch(() => {
            res.redirect(req.body.toUserUuid + '#bottom');
        });
});

module.exports = router;
