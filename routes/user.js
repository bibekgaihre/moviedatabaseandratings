//import required files and packages
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//importing required controller function
var dashboardController = require('../app/controller/dashboardController');
var profileController = require('../app/controller/profileController');
var searchController = require('../app/controller/searchController');
var movieController = require('../app/controller/movieController');
var ratingController = require('../app/controller/ratingController');
var top10Controller=require('../app/controller/top10Controller');

//Routes for User dashboard  of the application
router.get('/dashboarduser', dashboardController.userdashboard);
//Routes for user profile
router.get('/myprofile', profileController.userprofile);
//route for user to search movie
router.get('/searchmovie', searchController.searchview);
//route for searching movie
router.post('/searchmovie/search', searchController.getsearch);
//route for displaying all available movies
router.get('/usercontent', movieController.usermovielist);
//route to display the individual movie 
router.get('/usercontent/display/:movieid', movieController.userfindmovie, movieController.findrating);
//route to display the movies by the respective distributor/companyid
router.get('/usercontent/display/movielist/:companyid', movieController.listmoviebycompanyid);
//route to post or update rating
router.post('/usercontent/submitreview/:movieid', ratingController.postrating);
//route to show the top 10 movielist
router.get('/top10',top10Controller.displaytop10);
//route to delete the user account
router.get('/myprofile/deleteaccount/:sessionuserid',profileController.deleteuseraccount);
module.exports = router;