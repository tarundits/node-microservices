const axios = require('axios');
const Product = require('../models/productModel');

// Controller function to create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await Product.create(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function to fetch products
const fetchProducts = async (req, res) => {
  try {
    const token = req.headers['authorization'].split('Bearer ')[1];

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const userApiResponse = await axios.post('http://localhost:3001/api/verify_token', {}, {
      headers: headers,
    });

    if (userApiResponse.status !== 200) {
      return res.status(404).json({ error: 'User not found or unable to access user-service' });
    } else {
      const products = await Product.find({});
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ error: 'Please provide the token.' });
  }
};

module.exports = {
  createProduct,
  fetchProducts
}