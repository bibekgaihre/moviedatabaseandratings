

//importing the hashing library for node js  to hash the password
var bcrypt = require('bcrypt');
const saltRounds = 10;




var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var databaseconnection = require('../../config/databaseconnection');
exports.signupuser= function (req, res, next) {
    //validations
    req.checkBody('firstname', 'firstname field cannot be empty').notEmpty();
    req.checkBody('lastname', 'lastname field cannot be empty').notEmpty();
    req.checkBody('username', 'Username field cannot be empty').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'email field cannot be empty').notEmpty();
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('confirmpassword', 'Passwords do not match, please try again.').equals(req.body.password);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    const errors = req.validationErrors();
    if (errors) {
        res.render('signup.hbs', {
            notification: 'Registration Error',
            errors: errors
        });
    }
    else {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        //saltrounds are randomly generated strings to be added to password before hashing
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            let usedb = `USE moviedatabase`;
            databaseconnection.query(usedb, (err, result) => {
                if (err) throw err;
            });
            var insert = "INSERT INTO `user` (`firstname`, `lastname`,  `username`, `password`, `email`) VALUES ( '" + firstname + "', '" + lastname + "' , '" + username + "', '" + hash + "', '" + email + "')";
            databaseconnection.query(insert, function (err, result) {
                if (err) {
                    res.render('signup.hbs', {
                        notification: 'Username or email already exist',
                    });
                }
                else {
                    res.render('signup.hbs', {
                        notification: 'Registration Completed'
                    });
                }
            });
        });
    }



};
exports.signupdistributor= function (req, res, next) {
    req.checkBody('companyname', 'companyname field cannot be empty').notEmpty();
    req.checkBody('companyid', 'companyid field cannot be empty').notEmpty();
    req.checkBody('location', 'location field cannot be empty').notEmpty();
    req.checkBody('companyid', 'companyid must be between 4-15 characters long.').len(4, 15);
    req.checkBody('companyemail', 'email field cannot be empty').notEmpty();
    req.checkBody('companyid', 'companyid can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('confirmpassword', 'Passwords do not match, please try again.').equals(req.body.password);
    req.checkBody('companyemail', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('companyemail', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    const errors = req.validationErrors();
    if (errors) {
        res.render('signup.hbs', {
            notification: 'Registration Error',
            errors: errors
        });
    }
    else {
        var companyname = req.body.companyname;
        var companyid = req.body.companyid;
        var location = req.body.location;
        var companyemail = req.body.companyemail;
        var password = req.body.password;

        //saltrounds are randomly generated strings to be added to password before hashing
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            let usedb = `USE moviedatabase`;
            databaseconnection.query(usedb, (err, result) => {
                if (err) throw err;
            });
            var insert = "INSERT INTO `distributor` (`companyname`, `companyid`,  `location`, `companypassword`, `companyemail`) VALUES ( '" + companyname + "', '" + companyid + "' , '" + location + "', '" + hash + "', '" + companyemail + "')";
            databaseconnection.query(insert, function (err, result) {
                if (err) {
                    res.render('signup.hbs', {
                        notification: ' Company name or companyid or email already exist ',
                    });
                }
                else {
                    res.render('signup.hbs', {
                        notification: 'Registration Completed'
                    });
                }
            });
        });
    }

};
