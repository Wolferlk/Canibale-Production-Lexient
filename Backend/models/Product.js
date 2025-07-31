// models/Product.js
const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    
  },
  category: {
    type: String,
    enum: [
      'backpack',
      'cap',
      'Casual',
      'Handbag',
      'hoodie',
      'jeans',
      'pants',
      'polo_tshirt',
      'shoes',
      'shorts',
      'skirt',
      'tshirt'
    ], // Ensures the category is one of these values
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  sizes: {
    type: [String], // Array of available sizes
    required: true,
  },
  colors: {
    type: [String], // Array of available colors
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
   tagline: {
    type: String,
    default: ''
  },
  fit: {
    type: String,
    default: ''
  },
  fabric: {
    type: String,
    default: ''
  },
  functionality: {
    type: String,
    default: ''
  },
  material: {
    type: String,
    default: ''
  },
  fabricWeight: {
    type: String,
    default: ''
  },
  care: {
    type: String,
    default: ''
  },
  sizeFit: {
    type: String,
    default: ''
  },
  maleModel: {
    type: String,
    default: ''
  },
  femaleModel: {
    type: String,
    default: ''
  },



  status: {
    type: String,
    enum: ['available', 'low-stock', 'sold-out'], // Enum for product status
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
