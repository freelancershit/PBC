var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    firstGrading: {type: Number, default: 0},
    secondGrading: {type: Number, default: 0},
    thirdGrading: {type: Number, default: 0},
    fourthGrading: {type: Number, default: 0},
    finalGrading: {type: Number, default: 0},
    remarks: { type: String, default: "" },
    firstSemester: {type: Number, default: 0},
    secondSemester: {type: Number, default: 0},
    subject: String,
    email: String,
    firstName: String,
    lastName: String,
    middleName: String,
    yrLvl: String,
    section: String,
    faculty: String

});

module.exports = mongoose.model("Subject", subjectSchema);