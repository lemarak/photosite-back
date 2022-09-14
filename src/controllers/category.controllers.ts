import { Request, Response, NextFunction } from "express";
import { ICategory } from "../interfaces";

const {
  createCategory,
  getCategories,
  getCategoryByTitle,
  getCategoryById,
  reqUpdateCategory,
} = require("../queries/category.queries");

// Create category
export const newCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.fields!;
    const category = await getCategoryByTitle(title);
    if (category) {
      return res.status(409).json({ error: "La catégorie existe" });
    }
    const newCategory: ICategory = await createCategory(title);
    res.status(200).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// list categories
export const listCategories = async (
  _: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories: ICategory[] = (await getCategories()) || [];
    return res.status(200).json({ count: categories.length, categories });
  } catch (error) {
    next(error);
  }
};

//   update category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id, title } = req.fields!;
    if (title && id) {
      const category = await getCategoryById(id);
      if (category) {
        await reqUpdateCategory(category, title);
        res.status(200).json(category);
      } else {
        res.status(409).json({ error: "Pas de catégorie" });
      }
    } else {
      res.status(409).json({ error: "Données manquantes" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
