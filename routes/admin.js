var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('../config/passport');
var adminHomeController = require('../app/controller/adminhomeController');

router.get('/', adminHomeController.adminlogin);
router.post('/loginadmin', function (req, res, next) {
    req.session.email = req.body.username;
    req.session.password = req.body.password;
    next();
}, passport.authenticate('localadmin', {
successRedirect:'/admin/dashboardadmin',
failureRedirect:'/redirectadmin',
failureFlash:false,
}))

router.get('/dashboardadmin',adminHomeController.admindashboard);
router.get('/dashboardtop10',adminHomeController.admintop10);
router.post('/posttop10',adminHomeController.createtop10);
module.exports = router;