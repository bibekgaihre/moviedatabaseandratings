

var session = require('express-session');
var bodyParser = require('body-parser');


//user dashboard
//IF Cookie and Session are already saved in browser The page is directly redirected to dashboard else index page
exports.userdashboard= function (req, res,next) {
    // req.session.username=req.body.username;
    var sessionuser = req.session.username;
    if (req.session.username) {
      res.render('Userdashboard.hbs', {
        sessionname: sessionuser
      });
    }
    else {
      res.redirect('/');
      res.end();
    }
  }

  exports.distributordashboard=function(req, res,next) {
    // req.session.username=req.body.username;
    var sessioncompany = req.session.companyid;
    if (req.session.companyid) {
      res.render('Distributordashboard.hbs', {
        sessionname: sessioncompany
      });
    }
    else {
      res.redirect('/');
      res.end();
    }
  }


  