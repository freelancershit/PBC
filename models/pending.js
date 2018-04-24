var mongoose = require("mongoose");
var momemnt = require("moment");
var Schema = mongoose.Schema;

var pendingSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    middleName: String,
    fullName: String,
    age: Number,
    address: String,
    contact: String,
    status: {type: String, default: "Pending"},
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Pending", pendingSchema);