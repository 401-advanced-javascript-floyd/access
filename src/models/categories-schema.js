'use strict';

const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  display_name: {type: String, required: false},
  description: {type: String, required: false},
});

// If Mongoose already has a people, don't register a new one
const Category = mongoose.models.category ||
  // Otherwise create people model from schema
  mongoose.model('category', categoriesSchema);

module.exports = Category;