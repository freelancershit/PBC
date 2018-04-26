var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var curriculumSchema = new Schema({
    yrLvl: String,
    subjects: [{
            type: Schema.Types.ObjectId,
            ref: "Subject"
    }],
    section: String,
    academicYear: String,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    date: { type: Date, default: Date.now()}
});