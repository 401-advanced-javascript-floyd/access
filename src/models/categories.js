'use strict';
const Category = require('./categories-schema');
class Categories {

  constructor() {
  }

  getbyId(_id) {
    return Category.findById(_id, (err, item) => {
      return item.name;
    });

  }
  post(record) {
    var mongoCategories = new Category(record);
    return mongoCategories.save(); // include validation

  }

  put(_id, record) {
    Category.updateOne(_id, record, () => {
    });
    return Category.findById(_id, (err, item) => {
      return item.name;
    });

  }
  delete(_id) {
    return Category.deleteOne(_id, (err, item) => {
      return item.deletedCount;
    });
  }


}

module.exports = Categories;
