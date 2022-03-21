const mongoose = require('mongoose');
const User = require('../models/User');
const router = require('express').Router();

/*
    - Adds a friend to a user
    - PUT /friends/:Id/:friendid
*/
router.put('/:id/:friendId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, { $push: { friends: { userId: req.params.friendId } } }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
});

/*
    - deletes a friend from a user
    - DELETE /friends/:Id/:friendid
*/
router.delete('/:id/:friendId', async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: { userId: req.params.friendId } } }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
});




module.exports = router;