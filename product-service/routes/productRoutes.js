const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Endpoint for creating a new product
router.post('/products', productController.createProduct);

// Endpoint for fetching products (requires a valid token)
router.post('/fetch_products', productController.fetchProducts);

module.exports = router;
