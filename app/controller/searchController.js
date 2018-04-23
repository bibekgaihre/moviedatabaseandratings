var session = require('express-session');
var bodyParser = require('body-parser');
//importing database connection function
var databaseconnection = require('../../config/databaseconnection');


exports.searchview = function (req, res, next) {
    var sessionuser = req.session.username;
    if (req.session.username) {
        res.render('usersearch.hbs', {
            sessionname: sessionuser
        });
    }
    else {
        res.redirect('/');
        res.end();
    }
}

exports.getsearch = function (req, res, next) {
    var movielist = [];
    var sessionuser = req.session.username;
    var moviename=req.body.moviename;
    if (req.session.username) {
        let usedb = `USE moviedatabase`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        databaseconnection.query("SELECT movieid,moviename FROM movie WHERE moviename LIKE '"+moviename+"%' ", function (err, rows, fields) {
            if (err) throw err;
          
            for (i = 0; i < rows.length; i++) {
                var movie={
                    'movieid': rows[i].movieid,
                    'moviename': rows[i].moviename
                }
                movielist.push(movie);
                console.log(movielist);
            }
       
            res.render('usersearch.hbs',{
                "movielist": movielist,
                sessionname: sessionuser
            });
            
        });
    }
    else {
        res.redirect('/');
        res.end();
    }
}