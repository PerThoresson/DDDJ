var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var state = new Schema({
  deviceNumber:  String,
  title: String,
  artist: String,
  onAir: Boolean,
  master: Boolean
});

var State = mongoose.model('State', state);

module.exports = State;