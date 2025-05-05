const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const routes = require('./routes');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/category', routes.categoryRoutes);
app.use('/api/product', routes.productRoutes);
app.use('/api/banner', routes.bannerRoutes);
app.use('/api/cart', routes.cartRoutes);
app.use('/api/home-banner', routes.homeBannerRoutes);
app.use('/api/home-side-banner', routes.homeSideBannerRoutes);
app.use('/api/my-list', routes.myListRoutes);
app.use('/api/order', routes.orderRoutes);
app.use('/api/product-rams', routes.productRAMSRoutes);
app.use('/api/product-reviews', routes.productReviewsRoutes);
app.use('/api/product-size', routes.productSizeRoutes);
app.use('/api/product-weight', routes.productWeightRoutes);
app.use('/api/search', routes.searchRoutes);
app.use('/api/sub-category', routes.subCategoryRoutes);
app.use('/api/user', routes.userRoutes);

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

