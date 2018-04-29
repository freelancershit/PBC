var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new mongoose.Schema({
  litNumber: Number,
  category: String,
  title: String,
  content: String,
  publishDate: { type: Date, default: Date.now() },
  picture: { type: String, default: '' },
  archive: { type: Boolean, default: false },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Literary', newsSchema);
