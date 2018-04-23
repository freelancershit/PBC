var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');
var passport = require('passport');
var passportConfig = require('../config/passport');

function adminAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin || req.user.superUser) {
      return next();
    } else {
      return res.redirect('back');
    }
  } else {
    return res.redirect('/login');
  }
}

router.get('/users/new', adminAuthentication, function(req, res, next) {
  res.render('admin/users-new', { errors: req.flash('errors') });
});

router.post('/users', adminAuthentication, function(req, res, next) {
  // async.waterfall([
  //     function(callback){
  var user = new User();
  user.profile.name = req.body.firstName + ' ' + req.body.lastName;
  user.email = req.body.email;
  user.profile.picture = user.gravatar();
  user.birthdate = new Date(
    req.body.year + '-' + req.body.month + '-' + req.body.day,
  );
  if (!(req.body.password === req.body.confirmPassword)) {
    req.flash('errors', 'Your password and confirm password does not match');
    return res.redirect('/users/new');
  }
  if (req.body.admin === 'true') {
    user.isAdmin = true;
  } else {
    user.isAdmin = false;
  }

  user.password = req.body.password;
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      req.flash('errors', 'Account with that email address already exist');
      return res.redirect('/users/new');
    } else {
      user.save(function(err, user) {
        if (err) return next(err);
        // callback(null, user);
      });
    }
  });
  //     },
  //     function(user){
  //         var cart = new Cart();
  //         cart.owner = user._id;
  //         cart.save(function(err){
  //             if(err) return next(err);
  //             res.redirect("/users");
  //         });
  //     }
  // ]);
});

module.exports = router;
