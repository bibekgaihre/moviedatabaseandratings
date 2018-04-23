//import required files and packages
const express = require('express');
var session = require('express-session');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');

const hbs = require('hbs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var index = require('./routes/index');
var signup = require('./routes/signup');
var user = require('./routes/user');
var distributor = require('./routes/distributor');
var admin=require('./routes/admin');

var flash = require('connect-flash');
var passport = require('passport');


 

        //set local server port on 3000
        app.listen(3000, () => {
          console.log('Server Connected on port 3000 ')
        });
    
  
        //just use the static file holding directory name
        app.use(express.static('public'));
        app.set('views', path.join(__dirname, 'app/views'));
        app.set('view engine', 'hbs');
    

    //     app.all('*', function (req, res, next) {
    //         setTimeout(function () {
    //             next();
    //         }, 2000); // 2 seconds
    //     });

        app.use(cookieParser());
        //using session as global variable on app
        app.use(session({
            secret: 'ilovuit',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
            // cookie: { secure: true }
        }));
    
   
        app.use(flash());
        app.use(passport.initialize());
        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));

        app.use(function (req, res, next) {
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            next();
        });
        // mapping routes in express server
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(expressValidator());
        app.use('/signup', signup);
        app.use('/', index);
        app.use('/user', user)
        app.use('/distributor', distributor);
        app.use('/admin',admin);
        //The 404 Route (ALWAYS Keep this as the last route)
        app.get('*', function (req, res) {
            res.render('error.hbs');
        });

        module.exports=app;


