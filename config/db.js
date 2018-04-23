
var bcrypt=require('bcrypt');
const saltRounds=10;

var express = require('express');
var databaseconnection=require('../config/databaseconnection');   
function createdba() {
    let createdb=`CREATE DATABASE IF NOT EXISTS moviedatabase`;
    databaseconnection.query(createdb,(err,result)=>{
        if(err) throw err;
      
        let usedb=`USE moviedatabase`;
    databaseconnection.query(usedb,(err,result)=>{
        if(err) throw err;
        let createusertable=`CREATE TABLE IF NOT EXISTS user(userid int AUTO_INCREMENT, firstname VARCHAR(255), lastname VARCHAR(255), username VARCHAR(255), password binary(60), email VARCHAR(255), PRIMARY KEY (userid))`;
    databaseconnection.query(createusertable,(err,result)=>{
        if(err) throw err;
        
    })
    let createadmintable="CREATE TABLE IF NOT EXISTS `admin` (`id` int(11) NOT NULL,`username` varchar(255) NOT NULL,`password` varchar(255) NOT NULL)";
    databaseconnection.query(createadmintable,(err,result)=>{
        if(err) throw err;
    })
    let createdistributortable=`CREATE TABLE IF NOT EXISTS distributor(distributorid int AUTO_INCREMENT, companyname VARCHAR(255), companyid VARCHAR(255), location VARCHAR(255), companypassword binary(60), companyemail VARCHAR(255), PRIMARY KEY (distributorid))`;
    databaseconnection.query(createdistributortable,(err,result)=>{
        if(err) throw err;
    })
    
    let createmovietable=`CREATE TABLE IF NOT EXISTS movie(movieid int AUTO_INCREMENT, companyid VARCHAR(255), moviename VARCHAR(255), moviegenre VARCHAR(255), leadartists VARCHAR(255), movielength int, moviebudget int, director VARCHAR(255), producer VARCHAR(255), releasedate date,description varchar(500), PRIMARY KEY(movieid))`;
    databaseconnection.query(createmovietable,(err,result)=>{
        if(err) throw err;
     
    })
    
    var password='admin';
    var username='admin@admin.com';
    bcrypt.hash(password,saltRounds,function(err,hash){
        let usedb = `USE moviedatabase`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        var insertadmin="INSERT INTO `admin` (`id`,`username`, `password`) VALUES ( '1','"+username+"', '"+hash+"') ON DUPLICATE KEY UPDATE username='admin@admin.com', password='"+hash+"' ";
        databaseconnection.query(insertadmin,function(err,result){
            if(err) throw err;

        })
    })

    })
    });
}


module.exports.createdba=createdba;