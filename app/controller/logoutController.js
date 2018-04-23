
var bodyParser = require('body-parser');
var session = require('express-session');
exports.logout= (req, res) => {
    // req.logout();
    req.session.destroy(function (err) {
      res.clearCookie();
      if (err) {
        res.negotiate(err);
      }
      res.redirect('/');
    });
  }