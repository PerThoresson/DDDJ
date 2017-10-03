var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var history = new Schema({
  title:  String,
  artist: String,
  meta: {type: Boolean, default: false},
  track_id: String,
  cover_url: String,
  uri: String,
  popularity: Number,
  explicit: {type: Boolean},
  duration: Number,
  danceability: Number,
  energy: Number,
  key: Number,
  loudness: Number,
  tempo: Number,
  timestamp: Number
});

var History = mongoose.model('History', history);

module.exports = History;
