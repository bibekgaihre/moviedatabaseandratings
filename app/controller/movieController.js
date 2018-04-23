var session = require('express-session');
var bodyParser = require('body-parser');

//importing Round to function from node modules
const roundTo = require('round-to'); 
//importing database connection function
var databaseconnection = require('../../config/databaseconnection');

//Distributor side functions
exports.listmymovie = function (req, res, next) {
  var movielist = [];
  // req.session.username=req.body.username;
  var sessioncompany = req.session.companyid;
  if (req.session.companyid) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("SELECT movieid,moviename FROM movie where companyid=?", [sessioncompany], function (err, rows, field) {
      if (err) {
        res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
      }
      else {
        for (var i = 0; i < rows.length; i++) {
          var movie = {
            'movieid': rows[i].movieid,
            'moviename': rows[i].moviename
          }
          movielist.push(movie);
        }
        res.render('distributorcontent.hbs', {
          "movielist": movielist,
          sessionname: sessioncompany
        });
      }
    });
  }
  else {
    res.redirect('/');
    res.end();
  }
}

exports.deletemymovie = function (req, res, next) {
  // req.session.username=req.body.username;
  var sessioncompany = req.session.companyid;
  var movieid = req.params.movieid;
  if (req.session.companyid) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("DELETE FROM `movie` WHERE `movie`.`movieid` = ?;DELETE FROM `user_movie` WHERE `user_movie`.`movieid`=? ", [movieid, movieid], function (err, result) {
      if (err) throw err;
      res.redirect(req.get('referer'));
    })
  }
  else {
    res.redirect('/');
    res.end();
  }
}

exports.getuploadmymovie = function (req, res, next) {  // req.session.username=req.body.username;
  var sessioncompany = req.session.companyid;
  if (req.session.companyid) {
    res.render('distributoruploadmovie.hbs', {
      sessionname: sessioncompany
    });
  }
  else {
    res.redirect('/');
    res.end();
  }
}
exports.postuploadmymovie = function (req, res, next) {
  var sessioncompany = req.session.companyid;
  var moviename = req.body.moviename;
  var moviegenre = req.body.moviegenre;
  var movieartists = req.body.movieartists;
  var movielength = parseInt(req.body.movielength);
  var moviebudget = parseInt(req.body.moviebudget);
  var moviedirector = req.body.moviedirector;
  var movieproducer = req.body.movieproducer;
  var releasedate = req.body.releasedate;
  var description = req.body.moviedescription;
  var usedb = `USE moviedatabase`;
  databaseconnection.query(usedb, (err, result) => {
    if (err) throw err;
  });
  var uploadmovie = "INSERT INTO `movie` (`companyid`,`moviename`,`moviegenre`, `leadartists`, `movielength`, `moviebudget`, `director`, `producer`, `releasedate`,`description`) VALUES( '" + sessioncompany + "','" + moviename + "','" + moviegenre + "','" + movieartists + "','" + movielength + "','" + moviebudget + "','" + moviedirector + "','" + movieproducer + "','" + releasedate + "','" + description + "') ";
  databaseconnection.query(uploadmovie, function (err, result) {
    if (err) throw err;
  
    console.log("Movie info uploaded");
    res.redirect('/distributor/distributorcontent');
  })
 
}


//User Side functions
exports.usermovielist = function (req, res, next) {
  var movielist = [];
  // req.session.username=req.body.username;
  var sessionuser = req.session.username;
  if (req.session.username) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("SELECT * FROM movie", function (err, rows, field) {
      if (err) {
        res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
      }
      else {
        for (var i = 0; i < rows.length; i++) {
          var movie = {
            'movieid': rows[i].movieid,
            'moviename': rows[i].moviename,
            'companyid': rows[i].companyid
          }
          movielist.push(movie);
        }
        res.render('usercontent.hbs', {
          "movielist": movielist,
          sessionname: sessionuser
        });
      }
    });

  }
  else {
    res.redirect('/');
    res.end();
  }
}

exports.userfindmovie = function (req, res, next) {
  var sessionuser = req.session.username;
  var movieid = req.params.movieid;
  if (req.session.username) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    var findmovie = "SELECT * FROM movie WHERE movieid='" + movieid + "'";
    databaseconnection.query(findmovie, function (err, rows) {
      if (err) throw err;
     
      rows.forEach(function (results) {
        moviename = results.moviename,
          movieid = movieid,
          sessionname = sessionuser,
          moviegenre = results.moviegenre,
          leadartists = results.leadartists,
          movielength = results.movielength,
          moviebudget = results.moviebudget,
          releasedate = results.releasedate,
          director = results.director,
          producer = results.producer,
          description = results.description
        return next();
      })
    })
    
  }
  else {
    res.redirect('/');
    res.end();
  }
}

exports.findrating = function findrating(req, res, next) {
  var ratinglist = [];

  var sessionuser = req.session.username;
  var movieid = req.params.movieid;
  if (req.session.username) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    var count = "SELECT COUNT(*) AS ratingsCount FROM user_movie WHERE movieid= '" + movieid + "'  ";
    databaseconnection.query(count, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows[0].ratingsCount);
      rows.forEach(function (results) {
        if(results.ratingCount===0){
          countrating=0;
        }
        else{
        countrating = results.ratingsCount;
        }
      })
    });

    var rating1 = "SELECT COUNT(*) AS ratingsCount1 FROM user_movie WHERE movieid= '" + movieid + "' AND rating=1 ";
    var rating2 = "SELECT COUNT(*) AS ratingsCount2 FROM user_movie WHERE movieid= '" + movieid + "' AND rating=2 ";
    var rating3 = "SELECT COUNT(*) AS ratingsCount3 FROM user_movie WHERE movieid= '" + movieid + "' AND rating=3 ";
    var rating4 = "SELECT COUNT(*) AS ratingsCount4 FROM user_movie WHERE movieid= '" + movieid + "' AND rating=4 ";
    var rating5 = "SELECT COUNT(*) AS ratingsCount5 FROM user_movie WHERE movieid= '" + movieid + "' AND rating=5 ";
    var averagerating = "SELECT AVG(`rating`) AS avgrating FROM user_movie WHERE movieid= '" + movieid + "'";
    // to display the average rating of the specfic movie
    databaseconnection.query(averagerating, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows[0].ratingsCount);
  
      rows.forEach(function (results) {
        if(results.avgrating===null){
          displayaveragerating=0;
        }
        else{
          displayaveragerating=roundTo(results.avgrating,2);
        }
        
      })
    });

    //to display the number of people giving rating 1 star in specific movie
    databaseconnection.query(rating1, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows[0].ratingsCount);
      rows.forEach(function (results) {
        displayrating1 = results.ratingsCount1;
      })
    });
    //to display the number of people giving rating 2 star in specific movie
    databaseconnection.query(rating2, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows[0].ratingsCount);
      rows.forEach(function (results) {
        displayrating2 = results.ratingsCount2;
      })
    });
    //to display the number of people giving rating 3 star in specific movie
    databaseconnection.query(rating3, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows[0].ratingsCount);
      rows.forEach(function (results) {
        displayrating3 = results.ratingsCount3;
      })
    });
    //to display the number of people giving rating 4 star in specific movie
    databaseconnection.query(rating4, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows[0].ratingsCount);
      rows.forEach(function (results) {
        displayrating4 = results.ratingsCount4;
      })
    });
    //to display the number of people giving rating 2 star in specific movie
    databaseconnection.query(rating5, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows[0].ratingsCount);
      rows.forEach(function (results) {
        displayrating5 = results.ratingsCount5;
      })
    });


    var findrating = "SELECT * FROM user_movie WHERE movieid='" + movieid + "'";
    databaseconnection.query(findrating, function (err, rows, field) {
      if (err) throw err;
      // if (err) {
      //   res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
      // }
      else {
        for (var i = 0; i < rows.length; i++) {
          var rating = {
            'rating': rows[i].rating,
            'username': rows[i].username,
            'review': rows[i].review
          }
          ratinglist.push(rating);
        }
        res.render('usermoviedetail.hbs', {
          moviename: moviename,
          movieid: movieid,
          countrating: countrating,
          displayaveragerating:displayaveragerating,
          displayrating1: displayrating1,
          displayrating2: displayrating2,
          displayrating3: displayrating3,
          displayrating4: displayrating4,
          displayrating5: displayrating5,
          sessionname: sessionname,
          moviegenre: moviegenre,
          leadartists: leadartists,
          movielength: movielength,
          moviebudget: moviebudget,
          releasedate: releasedate,
          director: director,
          producer: producer,
          description: description,
          "ratinglist": ratinglist
        })
      }
   
    })


  }
  else {
    res.redirect('/');
    res.end();
  }
}

exports.listmoviebycompanyid = function (req, res, next) {
  var movielist = [];
  // req.session.username=req.body.username;
  var companyid = req.params.companyid;
  var sessionuser = req.session.username;
  if (req.session.username) {
    let usedb = `USE moviedatabase`;
    databaseconnection.query(usedb, (err, result) => {
      if (err) throw err;
    });
    databaseconnection.query("SELECT * FROM `movie` WHERE `companyid`='" + companyid + "' ", function (err, rows, field) {
      if (err) {
        res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
      }
      else {
        for (var i = 0; i < rows.length; i++) {
          var movie = {
            'movieid': rows[i].movieid,
            'moviename': rows[i].moviename
          }
          movielist.push(movie);
        }
        res.render('companymovielist.hbs', {
          "movielist": movielist,
          sessionname: sessionuser
        });
      }
    });
  }
  else {
    res.redirect('/');
    res.end();
  }
}