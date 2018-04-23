//import required files and packages
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//importing required controller function
var dashboardController = require('../app/controller/dashboardController');
var profileController = require('../app/controller/profileController');
var movieController = require('../app/controller/movieController');
var moviedetailController = require('../app/controller/moviedetailController');
var top10Controller=require('../app/controller/top10Controller');
//Routes for  distrbutor dashboard  of the application
router.get('/dashboarddistributor', dashboardController.distributordashboard);
//Routes for distrbutor profile
router.get('/distributorprofile', profileController.distributorprofile);
//route for distributor to view their own movie content
router.get('/distributorcontent', movieController.listmymovie);
//route for viewing movie information and rating of clicked movie
router.get('/distributorcontent/display/:movieid', moviedetailController.viewmymoviedetail,moviedetailController.findrating);
//route for deleting the movie information and ratings as a whole 
router.get('/distributorcontent/delete/:movieid', movieController.deletemymovie);
//route for distributor upload movie view
router.get('/distributoruploadmovie', movieController.getuploadmymovie);
//route for distrbutor to upload movie content
router.post('/upload', movieController.postuploadmymovie);
//route to display the top 10 movies
router.get('/top10',top10Controller.displaytop10distributor);
//route to delete the user account
router.get('/distributorprofile/deleteaccount/:sessiondistributorid',profileController.deletedistributoraccount);
module.exports = router;