const mongoose = require('mongoose');

const UserIdListSchema = new mongoose.Schema({
    userId: { type: String, required: true },
})

const repliesSchema = new mongoose.Schema({
    ownerId: { type: String, require: true },
    body: { type: String, require: true }
})

const postsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String },
    replies: [repliesSchema]
})

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    friends: [UserIdListSchema],
    posts: [postsSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User;