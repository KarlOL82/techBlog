const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Establish routes
router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);









module.exports = router;