
var data = require('../../config/db');
var session = require('express-session');
var bodyParser = require('body-parser');
exports.index=
function (req, res, next) {
    data.createdba();
    //if session already exist redirect to dashboard and if doesn't open index page
    if (req.session.username) {
      res.redirect('/user/dashboarduser');
    }
    if (req.session.companyid) {
      res.redirect('/distributor/dashboarddistributor');
    }
    else {
      res.render('index.hbs');
    }
  
  }
  exports.signup= function (req, res, next) {
    
    res.render('signup.hbs');
  }