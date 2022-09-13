import { Category } from "../database/models/Category";
import { ICategory } from "../interfaces/category.interface";

exports.createCategory = (title: string) => {
  const newCategory = new Category({ title });
  return Category.create(newCategory);
};

exports.getCategories = () => {
  return Category.find();
};

exports.getCategoryByTitle = (title: string) => {
  return Category.findOne({ title });
};

exports.getCategoryById = (id: string) => {
  return Category.findById(id);
};

exports.updateCategory = (category: ICategory, title: string) => {
  category.title = title;
  return category.save();
};
