require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', productRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
