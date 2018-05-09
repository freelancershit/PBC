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
    Subject.find({faculty: req.params.id, yrLvl:req.params.yrLvl, subject: req.params.subject, section: req.params.section})
    .exec(function(err, handle){
      console.log(handle);
    res.render('faculty/encode-grades', {handle : handle, yrLvl: req.params.yrLvl, subject: req.params.subject, section: req.params.section});
  });
});

router.post("/encode-grades", function(req, res, next){
  var grades = [];
  console.log("ohh: " + req.body.toggle);
  var toggle = req.body.toggle;
if(toggle == ""){
  if(!(req.body.yrLvl === "grade11" || req.body.yrLvl === "grade12")){
  if(req.body.firstGrading){
  if(req.body.firstGrading.length > 0){
  var firstGrading = req.body.firstGrading;
  console.log(req.body.firstGrading);
}
}
if(req.body.secondGrading){
  if(req.body.secondGrading.length > 0){
  var secondGrading = req.body.secondGrading;
}
}
if(req.body.thirdGrading){
  if(req.body.thirdGrading.length > 0){
  var thirdGrading = req.body.thirdGrading;
}
}
if(req.body.fourthGrading){
  if(req.body.fourthGrading.length > 0){
  var fourthGrading = req.body.fourthGrading;
}
}
if(req.body.finalGrading){
  if(req.body.finalGrading.length > 0){
  var finalGrading = req.body.finalGrading;
}
}
if(req.body.remarks){
  if(req.body.remarks.length > 0){
  var remarks = req.body.remarks;
}
}
if(req.body.id){
if(req.body.id.length > 0){
  for(var i = 0; i < req.body.id.length; i++){
if(req.body.firstGrading){
  console.log("value: " + firstGrading[i]);
  grades[i] ={
    firstGrading : firstGrading[i],
    first: false
  }
  console.log("array: " + grades[i].firstGrading );
  console.log("array: " + grades[i].first );
}
if(req.body.secondGrading){
  grades[i] ={
    secondGrading : secondGrading[i],
    second: false
  }
}
if(req.body.thirdGrading){
  grades[i] ={
    thirdGrading : thirdGrading[i],
    third : false
  }
}

if(req.body.fourthGrading){
  grades[i] ={
    fourthGrading : fourthGrading[i],
    remarks: remarks[i],
    finalGrading: finalGrading[i],
    fourth : false
  }
}

if(req.body.finalGrading){
  grades[i].finalGrading = finalGrading[i]
}

if(req.body.remarks){
  grades[i].remarks = remarks[i]
}


if(req.body.firstGrading && req.body.secondGrading && req.body.thirdGrading && req.body.fourthGrading && req.body.finalGrading && req.body.remarks){
    grades[i] ={
      firstGrading : firstGrading[i],
      first: false,
      secondGrading : secondGrading[i],
      second : false,
      thirdGrading : thirdGrading[i],
      third: false,
      fourthGrading : fourthGrading[i],
      fourth : false,
      finalGrading : finalGrading[i],
      remarks : remarks[i]
    }
  }
  }
  }
}
} else{
  if(req.body.firstSem){
    if(req.body.firstSem > 0){
      var firstSem = req.body.firstSem;
    }
  }
  if(req.body.secondSem){
    if(req.body.secondSem > 0){
      var secondSem = req.body.secondSem;
    }
  }
  if(req.body.id){
    if(req.body.id.length > 0){
      for(var i = 0; i < req.body.id.length;i++){
        if(req.body.firstSem){
          grades[i] = {
           firstSem : firstSem[i],
           firstSemester : false
          };
        }

        if(req.body.secondSem){
          grades[i] ={
            secondSem : secondSem[i],
            secondSemester : false
          }
        }

        if(req.body.firstSem && req.body.secondSem){
          grades[i] ={
            firstSem : firstSem[i],
            firstSemester: false,
            secondSem : secondSem[i],
            secondSemester : false
          }
        }
      }
    }
  }
}
console.log(grades);
  var gradeArray = req.body.id;
  console.log("before loop:" + grades[i]);
  for(var i = 0; i < gradeArray.length; i++){
    Subject.updateMany({_id: gradeArray[i]},  {$set: grades[i]}).exec(function(err, subject){
      if(err) return next(err);
        console.log(subject);
    });
  }
  res.redirect('/viewencoded-grades');

  
  // Subject.findById(req.params.id)
  // .exec(function(err, subject){
  //   if(err) return next(err);
  //   subject.firstGrading = req.body.firstGrading;
  //   subject.secondGrading = req.body.secondGrading;
  //   subject.thirdGrading = req.body.thirdGrading;
  //   subject.fourthGrading = req.body.fourthGrading;
  //   subject.finalGrading = req.body.finalGrading;
  //   subject.remarks = req.body.remarks;
  //   subject.save(function(err, subject){
  //     if(err) return next(err);
  //     console.log(subject);
  //     return res.redirect("back");
  //   });
  // });
}else if(toggle == "true" || toggle == true){
  console.log("pasok");
  if(!(req.body.yrLvl === "grade11" || req.body.yrLvl === "grade12")){
    if(req.body.firstGrading){
    if(req.body.firstGrading.length > 0){
    var firstGrading = req.body.firstGrading;
    console.log(req.body.firstGrading);
  }
  }
  if(req.body.secondGrading){
    if(req.body.secondGrading.length > 0){
    var secondGrading = req.body.secondGrading;
  }
  }
  if(req.body.thirdGrading){
    if(req.body.thirdGrading.length > 0){
    var thirdGrading = req.body.thirdGrading;
  }
  }
  if(req.body.fourthGrading){
    if(req.body.fourthGrading.length > 0){
    var fourthGrading = req.body.fourthGrading;
  }
  }
  if(req.body.finalGrading){
    if(req.body.finalGrading.length > 0){
    var finalGrading = req.body.finalGrading;
  }
  }
  if(req.body.remarks){
    if(req.body.remarks.length > 0){
    var remarks = req.body.remarks;
  }
  }
  if(req.body.id){
  if(req.body.id.length > 0){
    for(var i = 0; i < req.body.id.length; i++){
  if(req.body.firstGrading){
    console.log("value: " + firstGrading[i]);
    grades[i] ={
      firstGrading : firstGrading[i],
    }
    console.log("array: " + grades[i].firstGrading );
    console.log("array: " + grades[i].first );
  }
  if(req.body.secondGrading){
    grades[i] ={
      secondGrading : secondGrading[i],
    }
  }
  if(req.body.thirdGrading){
    grades[i] ={
      thirdGrading : thirdGrading[i],
    }
  }
  
  if(req.body.fourthGrading){
    grades[i] ={
      fourthGrading : fourthGrading[i],
      remarks: remarks[i],
      finalGrading: finalGrading[i],
    }
  }
  
  if(req.body.finalGrading){
    grades[i].finalGrading = finalGrading[i]
  }
  
  if(req.body.remarks){
    grades[i].remarks = remarks[i]
  }
  
  
  if(req.body.firstGrading && req.body.secondGrading && req.body.thirdGrading && req.body.fourthGrading && req.body.finalGrading && req.body.remarks){
      grades[i] ={
        firstGrading : firstGrading[i],
        secondGrading : secondGrading[i],
        thirdGrading : thirdGrading[i],
        fourthGrading : fourthGrading[i],
        finalGrading : finalGrading[i],
        remarks : remarks[i]
      }
    }
    }
    }
  }
  } else{
    if(req.body.firstSem){
      if(req.body.firstSem > 0){
        var firstSem = req.body.firstSem;
      }
    }
    if(req.body.secondSem){
      if(req.body.secondSem > 0){
        var secondSem = req.body.secondSem;
      }
    }
    if(req.body.id){
      if(req.body.id.length > 0){
        for(var i = 0; i < req.body.id.length;i++){
          if(req.body.firstSem){
            grades[i] = {
             firstSem : firstSem[i],
            };
          }
  
          if(req.body.secondSem){
            grades[i] ={
              secondSem : secondSem[i],
            }
          }
  
          if(req.body.firstSem && req.body.secondSem){
            grades[i] ={
              firstSem : firstSem[i],
              secondSem : secondSem[i],
            }
          }
        }
      }
    }
  }
  console.log(grades);
    var gradeArray = req.body.id;
    console.log("before loop:" + grades[i]);
    for(var i = 0; i < gradeArray.length; i++){
      Subject.updateMany({_id: gradeArray[i]},  {$set: grades[i]}).exec(function(err, subject){
        if(err) return next(err);
          console.log(subject);
      });
    }
    res.redirect('/viewencoded-grades');
  
    
}
});

router.post("/encode-grades/save", function(req, res, next){
  var grades = [];
  if(!(req.body.yrLvl === "grade11" || req.body.yrLvl === "grade12")){
  if(req.body.firstGrading){
  if(req.body.firstGrading.length > 0){
  var firstGrading = req.body.firstGrading;
  console.log(req.body.firstGrading);
}
}
if(req.body.secondGrading){
  if(req.body.secondGrading.length > 0){
  var secondGrading = req.body.secondGrading;
}
}
if(req.body.thirdGrading){
  if(req.body.thirdGrading.length > 0){
  var thirdGrading = req.body.thirdGrading;
}
}
if(req.body.fourthGrading){
  if(req.body.fourthGrading.length > 0){
  var fourthGrading = req.body.fourthGrading;
}
}
if(req.body.finalGrading){
  if(req.body.finalGrading.length > 0){
  var finalGrading = req.body.finalGrading;
}
}
if(req.body.remarks){
  if(req.body.remarks.length > 0){
  var remarks = req.body.remarks;
}
}
if(req.body.id){
if(req.body.id.length > 0){
  for(var i = 0; i < req.body.id.length; i++){
if(req.body.firstGrading){
  grades[i] ={
    firstGrading : firstGrading[i]
  }
}
if(req.body.secondGrading){
  grades[i] ={
    secondGrading : secondGrading[i]
  }
}
if(req.body.thirdGrading){
  grades[i] ={
    thirdGrading : thirdGrading[i]
  }
}

if(req.body.fourthGrading){
  grades[i] ={
    fourthGrading : fourthGrading[i]
  }
}

if(req.body.finalGrading){
  grades[i] ={
    finalGrading : finalGrading[i]
  }
}

if(req.body.remarks){
  grades[i] ={
    remarks : remarks[i]
  }
}

if(req.body.firstGrading && req.body.secondGrading && req.body.thirdGrading && req.body.fourthGrading && req.body.finalGrading && req.body.remarks){
    grades[i] ={
      firstGrading : firstGrading[i],
      secondGrading : secondGrading[i],
      thirdGrading : thirdGrading[i],
      fourthGrading : fourthGrading[i],
      finalGrading : finalGrading[i],
      remarks : remarks[i]
    }
  }
  }
  }
}
} else{
  if(req.body.firstSem){
    if(req.body.firstSem > 0){
      var firstSem = req.body.firstSem;
    }
  }
  if(req.body.secondSem){
    if(req.body.secondSem > 0){
      var secondSem = req.body.secondSem;
    }
  }
  if(req.body.id){
    if(req.body.id.length > 0){
      for(var i = 0; i < req.body.id.length;i++){
        if(req.body.firstSem){
          grades[i] = {
           firstSem : firstSem[i]
          };
        }

        if(req.body.secondSem){
          grades[i] ={
            secondSem : secondSem[i]
          }
        }

        if(req.body.firstSem && req.body.secondSem){
          grades[i] ={
            firstSem : firstSem[i],
            secondSem : secondSem[i]
          }
        }
      }
    }
  }
}
console.log(grades);
  var gradeArray = req.body.id;
  for(var i = 0; i < gradeArray.length; i++){
    Subject.update({_id: gradeArray[i]}, {$set: grades[i]}).exec(function(err, subject){
      if(err) return next(err);
        console.log(subject);
    });
  }
  res.redirect('/viewencoded-grades');

  
  // Subject.findById(req.params.id)
  // .exec(function(err, subject){
  //   if(err) return next(err);
  //   subject.firstGrading = req.body.firstGrading;
  //   subject.secondGrading = req.body.secondGrading;
  //   subject.thirdGrading = req.body.thirdGrading;
  //   subject.fourthGrading = req.body.fourthGrading;
  //   subject.finalGrading = req.body.finalGrading;
  //   subject.remarks = req.body.remarks;
  //   subject.save(function(err, subject){
  //     if(err) return next(err);
  //     console.log(subject);
  //     return res.redirect("back");
  //   });
  // });

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