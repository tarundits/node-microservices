const axios = require('axios');

// Middleware to validate JWT token
const validateToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const userApiResponse = await axios.post('http://localhost:3001/api/verify_token', {}, {
      headers: headers,
    });

    if (userApiResponse.status !== 200) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

	console.log('User Data', userApiResponse.data);

    // Attach the user data to the request object for later use
    req.user = userApiResponse.data;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Token validation failed' });
  }
};

module.exports = {
  validateToken,
};
