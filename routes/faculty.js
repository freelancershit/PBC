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

router.get('/encode-grades/:id/:yrLvl/:subject/:section', function(req, res, next) {
    Handle.findOne({faculty: req.params.id, yrLvl:req.params.yrLvl, subject: req.params.subject, section: req.params.section})
    .populate("handles")
    .exec(function(err, handle){
    res.render('faculty/encode-grades', {handle : handle, yrLvl: req.params.yrLvl, subject: req.params.subject, section: req.params.section});
  });
});

router.post("/encode-grades/:id", function(req, res, next){
  Handle.findById(req.params.id)
  .populate("handles")
  .exec(function(err, handle){
    if(err) return next(err);
    handle.handles.firstGrading = req.body.firstGrading;
    subject.secondGrading = req.body.secondGrading;
    subject.thirdGrading = req.body.thirdGrading;
    subject.fourthGrading = req.body.fourthGrading;
    subject.finalGrading = req.body.finalGrading;
    subject.remarks = req.body.remarks;
    subject.save(function(err, subject){
      if(err) return next(err);
      console.log(subject);
      return res.redirect("back");
    });
  });
});
  
  router.get('/encode1-grades', function(req, res, next) {
    User.findById({_id: req.user._id})
    .populate("faculty")
    .exec(function(err, user){
    res.render('faculty/encode1-grades', {user: user});
    });
  });
  
  router.get('/viewgrades/:id/:yrLvl/:subject/:section', function(req, res, next) {
    Subject.find({faculty: req.params.id, yrLvl:req.params.yrLvl, subject: req.params.subject, section: req.params.section}, function(err, subjects){
      res.render('faculty/viewgrades', {subjects : subjects, yrLvl: req.params.yrLvl, subject: req.params.subject, section: req.params.section});
    });
  });
  
  router.get('/viewencoded-grades', function(req, res, next) {
    User.findById({_id : req.user._id})
      .populate("faculty")
      .exec(function(err, user){
    res.render('faculty/viewencoded-grades', {user : user});
  });
  });

module.exports = router;