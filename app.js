const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');

/* Importing custom modules */
const { getRouteConfig } = require('./modules/queryHandler/getRouteConfig');
const { getLoggedInUser } = require('./modules/queryHandler/getLoggedInUser');

/* Importing routes */
const indexRouter = require('./routes/index');
const advertRouter = require('./routes/adverts');
const messagesRouter = require('./routes/messages');
const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const app = express();

app.use(
    session({
        secret: 'Leiebil lorem ipsum dolor sit amet',
        name: 'sessionUuid',
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false // false = allow http (not exclusively https)
        }
    })
);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        extended: true // to support URL-encoded bodies
    })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    })
);

// Setup static resources
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect routes
app.use('/', indexRouter);
app.use('/adverts', advertRouter);
app.use('/messages', messagesRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(async (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    const routeConfig = await getRouteConfig('/error');
    const user = await getLoggedInUser(req);

    res.render('error', { routeConfig, user });
});

module.exports = app;
