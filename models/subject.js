var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    subject: {
        grade: {
            firstGrading: Number,
            secondGrading: Number,
            thirdGrading: Number,
            fourthGrading: Number,
            finalGrading: Number,
            remarks: String
        },
        subject: String
    },
    email: String,
    firstName: String,
    lastName: String,
    middleName: String,
    yrLvl: String,
    section: String,
    faculty: String

});

module.exports = mongoose.model("Subject", subjectSchema);