

var session = require('express-session');
var bodyParser = require('body-parser');
//importing database connection function
var databaseconnection = require('../../config/databaseconnection');


// Controller function to display user profile
exports.userprofile = function (req, res, next) {
  var sessionuser = req.session.username;
  if (req.session.username) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("SELECT * FROM user where username=?", [sessionuser], function (err, rows) {
      if (err) throw err;
      rows.forEach(function (results) {
        res.render('userprofile.hbs', {
          sessionname: sessionuser,
          sessionuserid:results.userid,
          sessionfirstname: results.firstname,
          sessionlastname: results.lastname,
          sessionemail: results.email
        });
      })
     
    });

  }
  else {
    res.redirect('/');
    res.end();
  }
}


exports.distributorprofile = function (req, res, next) {
  // req.session.username=req.body.username;
  var sessioncompany = req.session.companyid;

  if (req.session.companyid) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("SELECT * FROM distributor where companyid=?", [sessioncompany], function (err, rows) {
      if (err) throw err;
      rows.forEach(function (results) {
        res.render('distributorprofile.hbs', {
          sessionname: sessioncompany,
          sessiondistributorid:results.distributorid,
          sessioncompanyname: results.companyname,
          sessionlocation: results.location,
          sessioncompanyemail: results.companyemail
        });
      })
    })

  }
  else {
    res.redirect('/');
    res.end();
  }

}

exports.deleteuseraccount=function(req,res,next){
  var sessionuser = req.session.username;
var userid=req.params.sessionuserid;
  if (req.session.username) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("DELETE FROM `user` WHERE `user`.`userid` = ?;DELETE FROM `user_movie` WHERE `user_movie`.`username`=? ", [userid, sessionuser], function (err, result) {
      if (err) throw err;
      res.redirect('/redirectindex');
    })
  }
  else {
    res.redirect('/');
    res.end();
  }
}

exports.deletedistributoraccount=function(req,res,next){
  var sessioncompany = req.session.companyid;
var distributorid=req.params.sessiondistributorid;
  if (req.session.companyid) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("DELETE FROM `distributor` WHERE `distributor`.`distributorid` = ?;DELETE FROM `movie` WHERE `movie`.`companyid`=? ", [distributorid, sessioncompany], function (err, result) {
      if (err) throw err;
      res.redirect('/redirectindex');
    })

  }
  else {
    res.redirect('/');
    res.end();
  }
}