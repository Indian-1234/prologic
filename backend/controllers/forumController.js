const ForumPost = require('../models/ForumPost');

exports.createPost = async (req, res) => {
  try {
    const post = new ForumPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.comments.push({
      userId: req.body.userId,
      content: req.body.content
    });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    comment.replies.push({
      userId: req.body.userId,
      content: req.body.content
    });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
