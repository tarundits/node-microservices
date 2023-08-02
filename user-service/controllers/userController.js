const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

// Endpoint for user registration
const register = async (req, res) => {
  try {
    const { password, ...userData } = req.body; // Extract password from the request body
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds

    const user = new User({ ...userData, password: hashedPassword }); // Save the hashed password to the user document
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint for user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verify_token = async (req, res) => {
  try {
    console.log(req.headers);
    const token = req.headers['authorization'].split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, 'lifeisshortliveitlarge', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      if(decoded.id) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  verify_token
};
