var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Pending = require("../models/pending");
var News = require("../models/newsAndAnnouncement");
var async = require("async");
var passport = require("passport");
var passportConfig = require("../config/passport");

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

router.get("/users/new", adminAuthentication, function(req, res, next){
        User.count({user: "admin"}).exec(function(err, adminCount){
            var adminNumber = (new Date()).getFullYear() +  "000000";
            var adminCounter = parseInt(adminNumber) + parseInt(adminCount);
        User.count({user: "faculty"}).exec(function(err, facultyCount){
            var facultyNumber = (new Date()).getFullYear() +  "0000000";
            var facultyCounter = parseInt(facultyNumber) + parseInt(facultyCount);
        User.count({user: "student"}).exec(function(err, studentCount){
            if(err) return next(err);
            var studentNumber = (new Date()).getFullYear() +  "00000000";
            var studentCounter = parseInt(studentNumber) + parseInt(studentCount);
            res.render("admin/users-new", {
                errors: req.flash("errors"), 
                studentCount: studentCounter, 
                facultyCount: facultyCounter, 
                adminCount: adminCounter
                });
            });
        });
    });
});

router.post("/users", adminAuthentication, function(req, res, next){
// async.waterfall([
//     function(callback){
    var user = new User();
    if(req.body.firstName && req.body.middleName && 
       req.body.lastName && req.body.age && req.body.address && 
       req.body.email && req.body.contact && req.body.user &&
       req.body.section && req.body.yrLvl && req.body.idNumber &&
       req.body.contact && req.body.year && req.body.month &&
       req.body.day && req.body.password && req.body.confirmPassword
    ){    
    user.profile.name = req.body.firstName + " " + req.body.middleName + " " + req.body.lastName;
    user.profile.firstName= req.body.firstName;
    user.profile.lastName= req.body.lastName;
    user.profile.middleName = req.body.middleName;
    user.email = req.body.email;
    user.profile.picture = user.gravatar();
    user.age = req.body.age;
    user.user = req.body.user;
    user.section = req.body.section;
    user.yrLvl = req.body.yrLvl;
    user.idNumber = req.body.idNumber;
    user.gender = req.body.gender

    user.contact = "+63" + parseInt(req.body.contact);
    // if(user.user === "admin"){
    //     User.count({user: user.user}).exec(function(err, count){
    //     var number = (new Date()).getFullYear() +  "000000";
    //     user.idNumber = parseInt(number) + count;
    // });
    // } else if(user.user === "faculty"){
    //     User.count({user: user.user}).exec(function(err, count){
    //         var number = (new Date()).getFullYear() +  "000000";
    //         user.idNumber = parseInt(number) + count;
    //     });
    // }else{
    //     User.count({user: user.user}).exec(function(err, count){
    //         var number = (new Date()).getFullYear() +  "000000";
    //         user.idNumber = parseInt(number) + count;
    //     });
    // }
    user.birthdate = new Date(req.body.year + "-" + req.body.month + "-" + req.body.day);
    if(!(req.body.password === req.body.confirmPassword)){
        req.flash("errors", "Your password and confirm password does not match");
        return res.redirect("/users/new");
    }
    if(req.body.user === "faculty"){
        user.isAdmin = true;
    } else if(req.body.user === "admin"){
        user.isAdmin = true;
        user.superUser = true;
    } else{
        user.isAdmin = false;
    }

    user.password = req.body.password;
    User.findOne({email : req.body.email}, function(err, existingUser){
    if(existingUser){
        req.flash("errors", "Account with that email address already exist");
        return res.redirect("/users/new");
    } else{
        user.save(function(err, user){
            if(err) return next(err);
            res.redirect("/users/new");
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
    } else{
        req.flash("errors", "Please fillup all the required information.");
        res.redirect("/users/new");
    }
});

router.get("/manage", function(req, res, next){
    Pending.find({}, function(err, allPending){
        if(err) return next(err);
        res.render("admin/manage-users", {allPending: allPending});
    });
});

router.get("/manage/:id", function(req, res, next){
    Pending.findById(req.params.id, function(err, pending){
        User.count({user: "student"}).exec(function(err, studentCount){
            if(err) return next(err);
            var studentNumber = (new Date()).getFullYear() +  "00000000";
            var studentCounter = parseInt(studentNumber) + parseInt(studentCount);
        if(err) return next(err);
        res.render("admin/register-student", {
            pending: pending, 
            studentCount: studentCounter,
            errors: req.flash("errors"),
            success: req.flash("success")
            });
        });
    });
});

router.post("/manage/:id", adminAuthentication, function(req, res, next){
    // async.waterfall([
    //     function(callback){
        var user = new User();
        if(req.body.firstName && req.body.middleName && 
           req.body.lastName && req.body.age && req.body.address && 
           req.body.email && req.body.contact && req.body.user &&
           req.body.section && req.body.yrLvl && req.body.idNum &&
           req.body.year && req.body.month && req.body.gender &&
           req.body.day && req.body.password && req.body.confirmPassword
        ){    
        user.profile.name = req.body.firstName + " " + req.body.middleName + " " + req.body.lastName;
        user.profile.firstName= req.body.firstName;
        user.profile.lastName= req.body.lastName;
        user.profile.middleName = req.body.middleName;
        user.email = req.body.email;
        user.profile.picture = user.gravatar();
        user.age = req.body.age;
        user.user = req.body.user;
        user.section = req.body.section;
        user.yrLvl = req.body.yrLvl;
        user.idNumber = req.body.idNum;
        user.gender = req.body.gender
        user.address = req.body.address        
        user.contact = "+63" + parseInt(req.body.contact);
        // if(user.user === "admin"){
        //     User.count({user: user.user}).exec(function(err, count){
        //     var number = (new Date()).getFullYear() +  "000000";
        //     user.idNumber = parseInt(number) + count;
        // });
        // } else if(user.user === "faculty"){
        //     User.count({user: user.user}).exec(function(err, count){
        //         var number = (new Date()).getFullYear() +  "000000";
        //         user.idNumber = parseInt(number) + count;
        //     });
        // }else{
        //     User.count({user: user.user}).exec(function(err, count){
        //         var number = (new Date()).getFullYear() +  "000000";
        //         user.idNumber = parseInt(number) + count;
        //     });
        // }
        user.birthdate = new Date(req.body.year + "-" + req.body.month + "-" + req.body.day);
        if(!(req.body.password === req.body.confirmPassword)){
            req.flash("errors", "Your password and confirm password does not match");
            return res.redirect("/manage/" + req.param.id);
        }
        if(req.body.user === "faculty"){
            user.isAdmin = true;
        } else if(req.body.user === "admin"){
            user.isAdmin = true;
            user.superUser = true;
        } else{
            user.isAdmin = false;
        }
    
        user.password = req.body.password;
        User.findOne({email : req.body.email}, function(err, existingUser){
        if(existingUser){
            req.flash("errors", "Account with that email address already exist");
            return res.redirect("/manage/" + req.params.id);
        } else{
            user.save(function(err, user){
                if(err) return next(err);
                Pending.findByIdAndRemove(req.params.id, function(err, pendingUser){
                  if(err) return next(err);
                  console.log(pendingUser);                
                  res.redirect("/manage");
                  
                });
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
        } else{
            req.flash("errors", "Please fillup all the required information.");
            console.log(req.body);
            res.redirect("/manage/" + req.params.id);
        }
    });

    router.delete("/manage/:id", function(req, res, next){
      Pending.findByIdAndRemove(req.params.id, function(err, pendingUser){
        if(err) return next(err);
        res.redirect("/manage");
      });
    });

    router.get('/manageaccount', function(req, res, next) {
      User.find({}, function(err, allUsers){
        res.render('admin/manageaccount', {users: allUsers});
      });
    });

    router.get('/manageaccount/:id', function(req, res, next) {
      User.findById(req.params.id, function(err, user){
        if(err) return next(err);
        console.log(user);
        res.render('admin/userdetails', {user: user});
      });
    });

    router.get('/postnewsandannouncements', function(req, res, next) {
      res.render('admin/postnews');
    });

    router.post("/postnewsandannouncements", function(req, res, next){
      if(req.body.category && req.body.title && req.body.content){
        var news = new News();        
        news.category = req.body.category;
        news.title = req.body.title;
        news.content = req.body.content;

        news.save(function(err, news){
          if(err) return next(err);
          console.log(news);
          res.redirect("/postnewsandannouncements");
        });
      } 
      console.log(req.body);
    });

module.exports = router;
