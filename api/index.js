const router = require('express').Router();

const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const postRoutes = require('./postRoutes');
const replyRoutes = require('./replyRoutes');

router.use('/users', userRoutes);
router.use('/friends', friendRoutes);
router.use('/posts', postRoutes);
router.use('/replies', replyRoutes);

module.exports = router;