require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
