var express = require('express');
var router = express.Router();
var expressSanitizer = require('express-sanitizer');
var User = require('../models/user');
var Pending = require('../models/pending');
var News = require('../models/newsAndAnnouncement');
var Curriculum = require('../models/curriculum');

var Literary = require('../models/literary');
var async = require('async');
var passport = require('passport');
var passportConfig = require('../config/passport');

router.use(expressSanitizer());
router.get('/studentdashboard', function(req, res, next) {
  res.render('student/dashboard');
});

router.get('/createliteraryworks', function(req, res, next) {
  Literary.count().exec(function(err, counter) {
    res.render('student/createlitworks', { counter: counter });
  });
});
router.post('/createliteraryworks', function(req, res, next) {
  if (req.body.category && req.body.title && req.body.content) {
    var literary = new Literary();
    console.log(req.user);
    literary.litNumber = req.body.litNumber;
    literary.category = req.body.category;
    literary.title = req.body.title;
    literary.firstName = req.user.profile.firstName;
    literary.middleName = req.user.profile.middleName;
    literary.lastName = req.user.profile.lastName;
    literary.student = req.user._id;
    literary.content = req.sanitize(req.body.content);
    literary.save(function(err, literary) {
      if (err) return next(err);
      console.log(literary);
      res.redirect('/createliteraryworks');
    });
  }
  console.log(req.body);
});

router.get('/viewgrade', function(req, res, next) {
  console.log('user:' + req.user);
  Curriculum.findOne({ email: req.user.email })
    .populate('subjects')
    .exec(function(err, curriculum) {
      if (err) return next(err);
      console.log('subjects: ' + curriculum);
      res.render('student/grade', { curriculum: curriculum });
    });
});

module.exports = router;
