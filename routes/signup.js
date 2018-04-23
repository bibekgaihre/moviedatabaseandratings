
//import required filed and packages
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

//importing controller functions
var signupController = require('../app/controller/signupController')

//POST  method for signup actions for user and distributor
router.post('/usersignup', signupController.signupuser);
router.post('/distributorsignup', signupController.signupdistributor);

//exporting the router
module.exports = router;