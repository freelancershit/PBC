var express = require('express');
var router = express.Router();

var expressSanitizer = require('express-sanitizer');
var User = require('../models/user');
var Pending = require('../models/pending');
var Literary = require('../models/literary');

router.use(expressSanitizer());

router.get('/', function(req, res, next) {
  res.render('main/homeplayground');
});

router.get('/activities', function(req, res, next) {
  res.render('main/activities');
});

router.get('/admindashboard', function(req, res, next) {
  res.render('admin/dashboard');
});

router.get('/registrationlist', function(req, res, next) {
  res.render('admin/registrationlist');
});

router.get('/abc', function(req, res, next) {
  User.find({user: "faculty"}, function(err, faculties){
    User.findById({_id: "5ae5606d9bc86038d602e338"}, function(err, user){
    res.render('main/abc', {user: user, faculties: faculties});
  });
  });
});

router.post("/abc",function(req, res, next){
  console.log(req.body.faculty1);
  console.log(req.body.faculty2);
  console.log(req.body.faculty3);
  console.log(req.body.faculty4);
  console.log(req.body.faculty5);
  console.log(req.body.faculty6);
});

router.get('/adminviewgrade', function(req, res, next) {
  res.render('admin/viewgrade');
});

router.get('/facultydashboard', function(req, res, next) {
  res.render('faculty/dashboard');
});

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
    literary.litNumber = req.body.litNumber;
    literary.category = req.body.category;
    literary.title = req.body.title;
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
  res.render('student/grade');
});

router.get('/admissionreq', function(req, res, next) {
  res.render('main/admissionreq');
});

router.get('/awards', function(req, res, next) {
  res.render('main/awards');
});

router.get('/clubs', function(req, res, next) {
  res.render('main/clubs');
});

router.get('/curriculum', function(req, res, next) {
  res.render('main/curriculum');
});

router.get('/facilities', function(req, res, next) {
  res.render('main/facilities');
});

router.get('/managepubs', function(req, res, next) {
  res.render('faculty/managepubs');
});

router.get('/encode-grades', function(req, res, next) {
  res.render('faculty/encode-grades');
});

router.get('/encode1-grades', function(req, res, next) {
  res.render('faculty/encode1-grades');
});

router.get('/viewgrades', function(req, res, next) {
  res.render('faculty/viewgrades');
});

router.get('/viewencoded-grades', function(req, res, next) {
  res.render('faculty/viewencoded-grades');
});


router.get('/register', function(req, res, next) {
  res.render('main/register', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
});

router.post('/register', function(req, res, next) {
  var pending = new Pending();
  if (
    req.body.firstName &&
    req.body.middleName &&
    req.body.lastName &&
    req.body.age &&
    req.body.address &&
    req.body.email &&
    req.body.contact
  ) {
    pending.firstName = req.body.firstName;
    pending.middleName = req.body.middleName;
    pending.lastName = req.body.lastName;
    pending.age = req.body.age;
    pending.address = req.body.address;
    pending.email = req.body.email;
    pending.contact = req.body.contact;
    pending.save(function(err, pendingUser) {
      if (err) return next(err);
      req.flash(
        'success',
        'Your account is in proccess now by the administrator',
      );
      res.redirect('/register');
    });
  } else {
    req.flash('errors', 'Please enter all the required information.');
    res.redirect('/register');
  }
});

router.get('/gallery', function(req, res, next) {
  res.render('main/gallery');
});

router.get('/history', function(req, res, next) {
  res.render('main/history');
});

router.get('/home', function(req, res, next) {
  res.render('main/home');
});

router.get('/news', function(req, res, next) {
  res.render('main/news');
});

router.get('/orgchart', function(req, res, next) {
  res.render('main/orgchart');
});

router.get('/policies', function(req, res, next) {
  res.render('main/policies');
});

router.get('/register', function(req, res, next) {
  res.render('main/register');
});

router.get('/scholarships', function(req, res, next) {
  res.render('main/scholarships');
});

router.get('/service', function(req, res, next) {
  res.render('main/service');
});

router.get('/vmop', function(req, res, next) {
  res.render('main/vmop');
});

module.exports = router;
