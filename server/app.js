const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors());
app.options('*', cors());
// Middleware
app.use(bodyParser.json());

//Routes
const categoryRoutes = require('./routes/categories');

app.use('/api/category', categoryRoutes);
// Serve static files from the React frontend app

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

