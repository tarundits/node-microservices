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
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
};

module.exports = {
  createProduct,
  fetchProducts
}