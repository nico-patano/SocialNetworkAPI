const mongoose = require('mongoose');
const User = require('../models/User');
const router = require('express').Router();

/*
    - Create reply to post
    - POST /replies/:postOwnerId/:postId
    - body: { reply: "string" }
*/
router.post('/:postOwnerId/:postId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.postOwnerId, "posts._id": req.params.postId }, { $push: { "posts.$.replies": { body: req.body.body, ownerId: req.body.ownerId } } }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
});

/*
    - Delete a reply
    - DELETE /replies/:postOwnerId/:postId/:replyId
*/
router.delete('/:postOwnerId/:postId/:replyId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.postOwnerId, "posts._id": req.params.postId }, { $pull: { "posts.$.replies": { _id: req.params.replyId } } }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
});



module.exports = router;