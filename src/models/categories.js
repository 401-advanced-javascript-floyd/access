'use strict';
const Category = require('./categories-schema');
class Categories {

  constructor() {
  }

  getAll() {
    return Category.find();
  }

  getbyId(_id) {
    return Category.findById(_id);
  }
  post(record) {
    var mongoCategories = new Category(record);
    return mongoCategories.save(); // include validation

  }

  async  put(_id, record) {
    await Category.updateOne(_id, record);
    return Category.findById(_id);

  }
  delete(_id) {
    return Category.deleteOne(_id);
  }


}

module.exports = Categories;
