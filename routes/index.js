
//import required files and packages
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var bodyParser = require('body-parser');
//importing database connection function
var databaseconnection = require('../config/databaseconnection');
//importing express session middleware 
var session = require('express-session');
//importing controller functions
var indexController = require('../app/controller/indexController');
var loginController = require('../app/controller/LoginController');
var logoutController = require('../app/controller/logoutController');

//List of Routers 
/* GET index page. */
router.get('/', indexController.index);
//GET signup page
router.get('/signup', indexController.signup);
//GET back to index if login fails
router.get('/redirectindex', function (req, res, next) {
  req.session.destroy(function (err) {
    res.clearCookie();
    if (err) {
      res.negotiate(err);
    }
    res.redirect('/');
  });
})
//POST login user
router.post('/loginuser', loginController.loginuser,
  //using passport.js for local authentication 
  //if the authentication is sucessful redirect it to dashboard 
  passport.authenticate('localuser', {
    successRedirect: ('/user/dashboarduser'),
    failureRedirect: ('/redirectindex'),
    failureFlash: false,
    // session:false
  })
);
//POST login distributor
router.post('/logindistributor',
  loginController.logindistributor,
  passport.authenticate('localdistributor', {
    successRedirect: '/distributor/dashboarddistributor',
    failureRedirect: '/redirectindex',
    failureFlash: true,
  })

);
//when the logout button is pressed, clear the session and logout of the application
router.get('/logout', logoutController.logout);

module.exports = router;