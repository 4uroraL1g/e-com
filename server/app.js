const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json()); // Built-in body parser for JSON
app.use(express.urlencoded({ extended: true })); // Built-in body parser for URL-encoded data

// Routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

