const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/endgame")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  emailid: {
    type: String,
    required: true
  },
  datacreated: {
    type: Date,
    default: Date.now
  }
});

const collectionSchema = mongoose.Schema({
  blogTitle: {
    type: String,
    required: true
  },
  bloggerUsername: {
    type: String,
    required: true
  },
  blogCategory: {
    type: String,
    required: true
  },
  blogDescription: {
    type: String,
    required: true
  },
  datacreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("users", userSchema);
