// src/components/Forum.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';

const Forum = ({ courseId }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [comments, setComments] = useState({});

  const handlePostSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          content: newPost,
          userId: 'current-user-id' // Replace with actual user ID
        }),
      });
      
      if (response.ok) {
        const post = await response.json();
        setPosts([post, ...posts]);
        setNewPost('');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/forum/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current-user-id' // Replace with actual user ID
        }),
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => 
          post._id === postId ? updatedPost : post
        ));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

// src/components/Forum.js (continued)

const handleComment = async (postId, comment) => {
    try {
      const response = await fetch(`http://localhost:5000/api/forum/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current-user-id', // Replace with actual user ID
          content: comment
        }),
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => 
          post._id === postId ? updatedPost : post
        ));
        setComments({ ...comments, [postId]: '' });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const handleReply = async (postId, commentId, reply) => {
    try {
      const response = await fetch(`http://localhost:5000/api/forum/posts/${postId}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current-user-id', // Replace with actual user ID
          content: reply
        }),
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => 
          post._id === postId ? updatedPost : post
        ));
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Course Discussion
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handlePostSubmit}
            sx={{ alignSelf: 'flex-start' }}
          >
            Post
          </Button>
        </Box>
  
        {/* Posts List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {posts.map((post) => (
            <Card key={post._id} variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar>{post.userId.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      User Name {/* Replace with actual user name */}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
  
                {/* Post Media */}
                {post.media && (
                  <Box sx={{ mb: 2 }}>
                    <img 
                      src={post.media} 
                      alt="Post media" 
                      style={{ maxWidth: '100%', borderRadius: 8 }}
                    />
                  </Box>
                )}
  
                {/* Like and Comment Buttons */}
                <CardActions sx={{ px: 0 }}>
                  <Button
                    startIcon={<ThumbUpIcon color={post.likes.includes('current-user-id') ? 'primary' : 'inherit'} />}
                    onClick={() => handleLike(post._id)}
                  >
                    {post.likes.length} Likes
                  </Button>
                  <Button
                    startIcon={<CommentIcon />}
                  >
                    {post.comments.length} Comments
                  </Button>
                </CardActions>
  
                {/* Comments Section */}
                <Box sx={{ mt: 2 }}>
                  {post.comments.map((comment) => (
                    <Box key={comment._id} sx={{ ml: 4, mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {comment.userId.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              User Name {/* Replace with actual user name */}
                            </Typography>
                            <Typography variant="body2">
                              {comment.content}
                            </Typography>
                          </Paper>
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                            <Button size="small">Like</Button>
                            <Button size="small">Reply</Button>
                          </Box>
  
                          {/* Replies */}
                          {comment.replies.map((reply) => (
                            <Box key={reply._id} sx={{ ml: 4, mt: 1 }}>
                              <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                                <Avatar sx={{ width: 24, height: 24 }}>
                                  {reply.userId.charAt(0)}
                                </Avatar>
                                <Paper variant="outlined" sx={{ p: 1, flex: 1 }}>
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    User Name {/* Replace with actual user name */}
                                  </Typography>
                                  <Typography variant="body2">
                                    {reply.content}
                                  </Typography>
                                </Paper>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  ))}
  
                  {/* New Comment Input */}
                  <Box sx={{ display: 'flex', gap: 2, ml: 4, mt: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Write a comment..."
                      value={comments[post._id] || ''}
                      onChange={(e) => setComments({ ...comments, [post._id]: e.target.value })}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleComment(post._id, comments[post._id])}
                    >
                      Comment
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
  };
  
  export default Forum;