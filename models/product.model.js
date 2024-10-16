// models/product.model.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  quantity: Number,
  category: String,
});

module.exports = mongoose.model('Product', productSchema);

