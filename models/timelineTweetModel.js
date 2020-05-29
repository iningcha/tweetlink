const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timelineTweetSchema = new Schema({
  id_str: String,
  user: Object,
  text: String,
  createdAt: { type: Date, expires: 604800, default: Date.now } // 604800 seconds in a week
});

const TimelineTweet = mongoose.model("timelineTweet", timelineTweetSchema);

module.exports = TimelineTweet;
