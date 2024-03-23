const mongoose = require('mongoose');
const { Schema } = mongoose;

const CollectionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blogs = mongoose.model('blogs', CollectionSchema);
module.exports = Blogs;