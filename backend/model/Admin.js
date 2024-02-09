const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    adminId: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    adminPriority: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    datacreated: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model("admin-users", AdminSchema);
module.exports = Admin;