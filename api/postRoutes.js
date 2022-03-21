const mongoose = require('mongoose');
const User = require('../models/User');
const router = require('express').Router();

/*
    - New post for existing user
    - POST /posts/:userid
    - body: { title: "string", body: "string" }
*/
router.post('/:userId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $push: { posts: { title: req.body.title, body: req.body.body, replies: [] } } }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
});

/*
    - Delete a post
    - DELETE /posts/:userid/:postid
*/
router.delete('/:userId/:postId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { posts: { _id: req.params.postId } } }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
})

/*
    - Edit a post
    - PUT /posts/:userid/:postid
    - body: { title: "string", body: "string" }
*/
router.put('/:userId/:postId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId, "posts._id": req.params.postId }, { $set: { "posts.$.title": req.body.title, "posts.$.body": req.body.body } }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
})

/*
    - Get all posts from all users
    - GET /posts
*/
router.get('/', async (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        //gets posts from every user
        posts = users.map(user => {
            return user.posts;
        })
        res.json(posts);
    });
})



module.exports = router;