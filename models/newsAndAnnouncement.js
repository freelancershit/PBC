var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new mongoose.Schema({
    category: String,
    title: String,
    content: String,
    picture: {type: String, default: ""}
});


module.exports = mongoose.model("News", newsSchema);
