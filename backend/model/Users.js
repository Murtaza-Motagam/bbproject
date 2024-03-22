const mongoose = require('mongoose');
const { date } = require('yup');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    location: {
        type: String,
        required: false,
    },
    desc: {
        type: String
    },
    link: {
        type: String
    },
    datacreated: {
        type: Date,
        default: Date.now
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
   
});

const Users = mongoose.model("users", UserSchema);
module.exports = Users;