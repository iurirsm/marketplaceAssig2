// app.js

require('dotenv').config(); // Environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB database'))
.catch((err) => console.error('Could not connect to MongoDB:', err));


// Import routes
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the filament store application');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});