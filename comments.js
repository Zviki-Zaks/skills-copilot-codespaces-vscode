// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express application
const app = express();
// Enable CORS
app.use(cors());
// Parse the body
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Define route
app.get('/posts/:id/comments', (req, res) => {
  // Send comments
  res.send(commentsByPostId[req.params.id] || []);
});

// Define route
app.post('/posts/:id/comments', (req, res) => {
  // Generate id
  const commentId = randomBytes(4).toString('hex');
  // Get the content
  const { content } = req.body;
  // Get the comments
  const comments = commentsByPostId[req.params.id] || [];
  // Add new comment
  comments.push({ id: commentId, content });
  // Update comments
  commentsByPostId[req.params.id] = comments;
  // Send comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});