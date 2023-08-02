const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', productController);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
