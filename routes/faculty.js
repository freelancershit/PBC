var express = require('express');
var router = express.Router();
var expressSanitizer = require("express-sanitizer");
var User = require("../models/user");
var Pending = require("../models/pending");
var News = require("../models/newsAndAnnouncement");
var Curriculum = require("../models/curriculum");
var Subject = require("../models/subject");
var Handle = require("../models/facultyHandle");
var async = require("async");
var passport = require("passport");
var passportConfig = require("../config/passport");

router.get("/encode", function(req, res, next){
    Subject.find({faculty: req.user._id}, function(err, subjects){
        if(err) return next(err);
        res.render("faculty/viewencoded-grades", {subjects: subjects});
    });
});

router.get("/encode/:yr/:sec/:subj", function(req, res, next){
    Subject.find({yrLvl: req.params.yr, section: req.params.sec, subject: req.params.subject}, function(err, subject){
        if(err) return next(err);
        res.render("faculty/viewgrades", {subject : subject});
    });
});

router.get('/encode-grades', function(req, res, next) {
    res.render('faculty/encode-grades');
  });
  
  router.get('/encode1-grades', function(req, res, next) {
    Handle.find({_id: req.user._id}, function(err, handles){
    res.render('faculty/encode1-grades', {handles: handles});
    });
  });
  
  router.get('/viewgrades', function(req, res, next) {
    res.render('faculty/viewgrades');
  });
  
  router.get('/viewencoded-grades', function(req, res, next) {
    res.render('faculty/viewencoded-grades');
  });

module.exports = router;