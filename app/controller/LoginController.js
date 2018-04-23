
var databaseconnection = require('../../config/databaseconnection');
var session = require('express-session');
var bodyParser = require('body-parser');
exports.loginuser=  function (req, res, next) {
    //store username and password in session 
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    next();
  };
  exports.logindistributor=  function (req, res, next) {
      //store companyid and company password in session
    req.session.companyid = req.body.username;
    req.session.companypassword = req.body.password;
    next();
  }