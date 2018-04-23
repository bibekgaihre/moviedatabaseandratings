//import required files and packages


//authentication process
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

//database validation
var databaseconnection = require('../config/databaseconnection');
var mysql = require('mysql');

//using local method for authenticating admin
passport.use('localadmin',new LocalStrategy(
  function(username,password,done){
    console.log(username);
    console.log(password);
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    })
    databaseconnection.query('SELECT password FROM admin WHERE username = ?', [username], function (err, results, fields) {
      if(err) throw err;
      if(results.length===0){
        done(null,false);
      }
      else{
        var hash = results[0].password.toString();
        console.log(hash);
        bcrypt.compare(password, hash, function (err, response) {
          if (response === true) {
            return done(null, 'sdsad')
          }
          
          else {
            return done(null, false);
          }
        })
   
      }
    })
  }
))


//using local method for authenticating passport.js
passport.use('localuser', new LocalStrategy(

  function (username, password, done) {

    console.log(username);
    console.log(password);

    //create database connection and use the given database and execute the queries
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    })
    databaseconnection.query('SELECT password FROM user WHERE username = ?', [username], function (err, results, fields) {

      if (err) { done(err) };

      if (results.length === 0) {
        done(null, false);
      }
      else {
        var hash = results[0].password.toString();
        console.log(hash);
        bcrypt.compare(password, hash, function (err, response) {
          if (response === true) {
            return done(null, 'sdsad')
          }
          
          else {
            return done(null, false);
          }
        })
      }


    })
    // return done(null, 'sda');

  }
));

passport.use('localdistributor', new LocalStrategy(

  function (username, password, done) {

    console.log(username);
    console.log(password);

    //create database connection and use the given database and execute the queries
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    })
    databaseconnection.query('SELECT companypassword FROM distributor WHERE companyid = ?', [username], function (err, results, fields) {

      if (err) { done(err) };

      if (results.length === 0) {
        done(null, false);
      }
      else {
        var hash = results[0].companypassword.toString();
        console.log(hash);
        bcrypt.compare(password, hash, function (err, response) {
          if (response === true) {
            return done(null, 'sdsad')
          }
          else {
            return done(null, false);
          }
        })
      }


    })
    // return done(null, 'sda');

  }
));


module.exports = passport;