const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category :{type: String, required:false},
  display_name: {type: String, required: false},
  description: {type: String, required: false},
});

// If Mongoose already has a people, don't register a new one
const Product = mongoose.models.category ||
  // Otherwise create people model from schema
  mongoose.model('product', productSchema);

module.exports = Product;
