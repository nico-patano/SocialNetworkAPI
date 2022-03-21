const mongoose = require('mongoose');
const User = require('../models/User');
const router = require('express').Router();

/*
    - Creates new user
    - POST /users
    - body: {"userName": "string"}
*/
router.post('/', async (req, res) => {
    User.create({ userName: req.body.userName }, (err, user) => {
        if (err) {
            return handleError(err);
        } else {
            res.json(user);
        }
    })
});

/*
    - Gets all users
    - GET /users
*/
router.get('/', async (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(users);
    });
});

/*
    - Deletes User
    - DELETE /users/:id
*/
router.delete('/:id', async (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
});

module.exports = router;