var session = require('express-session');
var bodyParser = require('body-parser');
//importing database connection function
var databaseconnection = require('../../config/databaseconnection');

exports.displaytop10 = function (req, res, next) {
    var top10movielist=[];
        var sessionuser = req.session.username;
      

        if (req.session.username) {
            let usedb = `USE moviedatabase`;
            databaseconnection.query(usedb, (err, result) => {
              if (err) throw err;
            });
           databaseconnection.query("SELECT moviename,rating FROM top10 ",function(err,rows,field){
               if(err) throw err;
               else{
                   for(var i=0;i<rows.length;i++){
                       var movie={
                           'moviename':rows[i].moviename,
                           'rating':rows[i].rating
                       }
                       top10movielist.push(movie);
                   }
                   res.render('usertop10.hbs', {
                       "movielist":top10movielist,
                    sessionname: sessionuser
                });
               }
           })
         
        }
      
        else {
            res.redirect('/');
            res.end();
        }
     }

     exports.displaytop10distributor=function (req, res, next) {
        var top10movielist=[];
            var sessioncompany = req.session.companyid;
          
    
            if (req.session.companyid) {
                let usedb = `USE moviedatabase`;
                databaseconnection.query(usedb, (err, result) => {
                  if (err) throw err;
                });
               databaseconnection.query("SELECT moviename,rating FROM top10 ",function(err,rows,field){
                   if(err) throw err;
                   else{
                       for(var i=0;i<rows.length;i++){
                           var movie={
                               'moviename':rows[i].moviename,
                               'rating':rows[i].rating
                           }
                           top10movielist.push(movie);
                       }
                       res.render('distributortop10.hbs', {
                           "movielist":top10movielist,
                        sessionname: sessioncompany
                    });
                   }
               })
             
            }
          
            else {
                res.redirect('/');
                res.end();
            }
         }