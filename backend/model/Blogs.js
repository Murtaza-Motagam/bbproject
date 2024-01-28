const mongoose = require('mongoose');
const { Schema } = mongoose;

const CollectionSchema = new Schema({
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
    blogCreated: {
        type: Date,
        default: Date.now
    }
});

const Blogs = mongoose.model('blogs', CollectionSchema);
module.exports = Blogs;