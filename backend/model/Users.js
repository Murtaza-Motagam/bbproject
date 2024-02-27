const mongoose = require('mongoose');
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
    webLink: {
        type: String,
        required: false,
    },
    userDesc: {
        type: String,
        required: false,
    },
    datacreated: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model("users", UserSchema);
module.exports = Users;