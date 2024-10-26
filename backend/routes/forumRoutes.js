const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.post('/posts', forumController.createPost);
router.post('/posts/:postId/like', forumController.likePost);
router.post('/posts/:postId/comments', forumController.addComment);
router.post('/posts/:postId/comments/:commentId/replies', forumController.addReply);

module.exports = router;