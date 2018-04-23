var session = require('express-session');
var bodyParser = require('body-parser');
//importing database connection function
var databaseconnection = require('../../config/databaseconnection');

//a function to post review and rating 
exports.postrating= function (req, res, next) {
    var sessionuser = req.session.username;
    var movieid = req.params.movieid;
    var usermovieid = sessionuser + movieid;
    var rating = parseInt(req.body.stars);
    var review = req.body.userreview;
    if (req.session.username) {
      let usedb = `USE moviedatabase`;
      databaseconnection.query(usedb, (err, result) => {
        if (err) throw err;
      });
      var submitreview = "INSERT INTO `user_movie` (`usermovieid`, `username`,`movieid`,`rating`, `review`) VALUES(  '" + usermovieid + "' ,'" + sessionuser + "','" + movieid + "','" + rating + "','" + review + "') ON DUPLICATE KEY UPDATE rating= '" + rating + "', review='" + review + "' ";
      databaseconnection.query(submitreview, function (err, result) {
        if (err) throw err;
        console.log("Movie review submited");
        res.redirect(req.get('referer'));
      })
    }
    else {
      res.redirect('/');
      res.end();
    }
  }