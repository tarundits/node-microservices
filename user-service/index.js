const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, 'lifeisshortliveitlarge', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.userId = decoded.id;
    next();
  });
}

// Unprotected endpoint for user registration
app.use('/api', userController);

// Protected endpoint for user details (requires a valid token)
app.get('/api/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
