var session = require('express-session');
var bodyParser = require('body-parser');
var databaseconnection = require('../../config/databaseconnection');

exports.adminlogin = function (req, res, next) {
    res.render('adminpanellogin.hbs');
}
exports.admintop10 = function (req, res, next) {
    var sessionemail = req.session.email;
    if (req.session.email) {
        res.render('adminpaneltop10.hbs');
    }
    else {

        res.redirect('/admin');
        res.end();
    }

}
exports.createtop10 = function (req, res, next) {
    var sessionemail = req.session.email;
    var movie1 = req.body.number1;
    var rating1 = req.body.rating1;
    var movie2 = req.body.number2;
    var rating2 = req.body.rating2;
    var movie3 = req.body.number3;
    var rating3 = req.body.rating3;
    var movie4 = req.body.number4;
    var rating4 = req.body.rating4;
    var movie5 = req.body.number5;
    var rating5 = req.body.rating5;
    var movie6 = req.body.number6;
    var rating6 = req.body.rating6;
    var movie7 = req.body.number7;
    var rating7 = req.body.rating7;
    var movie8 = req.body.number8;
    var rating8 = req.body.rating8;
    var movie9 = req.body.number9;
    var rating9 = req.body.rating9;
    var movie10 = req.body.number10;
    var rating10 = req.body.rating10;
    if (req.session.email) {
        let usedb = `USE moviedatabase`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
      databaseconnection.query("INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('1', '" + movie1 + "', '" + rating1 + "') ON DUPLICATE KEY UPDATE moviename='" + movie1 + "', rating='" + rating1 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('2', '" + movie2 + "', '" + rating2 + "') ON DUPLICATE KEY UPDATE moviename='" + movie2 + "', rating='" + rating2 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('3', '" + movie3 + "', '" + rating3 + "') ON DUPLICATE KEY UPDATE moviename='" + movie3 + "', rating='" + rating3 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('4', '" + movie4 + "', '" + rating4 + "') ON DUPLICATE KEY UPDATE moviename='" + movie4 + "', rating='" + rating4 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('5', '" + movie5 + "', '" + rating5 + "') ON DUPLICATE KEY UPDATE moviename='" + movie5 + "', rating='" + rating5 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('6', '" + movie6 + "', '" + rating6 + "') ON DUPLICATE KEY UPDATE moviename='" + movie6 + "', rating='" + rating6 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('7', '" + movie7 + "', '" + rating7 + "') ON DUPLICATE KEY UPDATE moviename='" + movie7 + "', rating='" + rating7 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('8', '" + movie8 + "', '" + rating8 + "') ON DUPLICATE KEY UPDATE moviename='" + movie8 + "', rating='" + rating8 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('9', '" + movie9 + "', '" + rating9 + "') ON DUPLICATE KEY UPDATE moviename='" + movie9 + "', rating='" + rating9 + "';INSERT INTO `top10` (`id`, `moviename`, `rating`) VALUES ('10', '" + movie10 + "', '" + rating10 + "') ON DUPLICATE KEY UPDATE moviename='" + movie10 + "', rating='" + rating10 + "'  ",function(err,result){
        res.render('adminpaneltop10.hbs', {
            message: 'Successfully update for this week'
        })
      })
    }
    else {
        res.redirect('/admin');
        res.end();
    }
}
exports.admindashboard = function (req, res, next) {
    var sessionemail = req.session.email;

    if (req.session.email) {
        let usedb = `USE moviedatabase`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });

        databaseconnection.query(`SELECT COUNT(*) AS totaluserrating FROM user_movie`, function (err, rows, fields) {
            if (err) throw err;
            rows.forEach(function (results) {
                countuserrating = results.totaluserrating;
            })
            databaseconnection.query('SELECT COUNT(*) AS totalmovie FROM movie', function (err, rows, fields) {
                if (err) throw err;
                rows.forEach(function (results) {
                    countmovie = results.totalmovie;
                })
                databaseconnection.query('SELECT COUNT(*) AS totaluser FROM user', function (err, rows, fields) {
                    if (err) throw err;
                    rows.forEach(function (results) {
                        countuser = results.totaluser;
                    })
                    databaseconnection.query('SELECT COUNT(*) AS totaldistributor FROM distributor', function (err, rows, fields) {
                        if (err) throw err;
                        rows.forEach(function (results) {
                            countdistributor = results.totaldistributor;
                        })
                        res.render('dashboardadmin.hbs', {
                            sessionname: sessionemail,
                            totaluserrating: countuserrating,
                            totalmovie: countmovie,
                            totaluser: countuser,
                            totaldistributor: countdistributor
                        })
                    })

                })

            })

        });

    }
    else {

        res.redirect('/admin');
        res.end();
    }

}

