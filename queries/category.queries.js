const Category = require("../database/models/Category");

exports.createCategory = (title) => {
  const newCategory = new Category({ title });
  return Category.create(newCategory);
};

exports.getCategories = () => {
  return Category.find();
};

exports.getCategoryByTitle = (title) => {
  return Category.findOne({ title });
};

exports.getCategoryById = (id) => {
  return Category.findById(id);
};

exports.updateCategory = (category, title) => {
  category.title = title;
  return category.save();
};
