const {
  createCategory,
  getCategories,
  getCategoryByTitle,
  getCategoryById,
  updateCategory,
} = require("../queries/category.queries");

// Create category
exports.createCategory = async (req, res, next) => {
  try {
    const { title } = req.fields;
    const category = await getCategoryByTitle(title);
    if (category) {
      return res.status(409).json({ error: "La catégorie existe" });
    }
    const newCategory = await createCategory(title);
    res.status(200).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// list categories
exports.listCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();
    return res.status(200).json({ count: categories.length, categories });
  } catch (error) {
    next(error);
  }
};

//   update category
exports.updateCategory = async (req, res) => {
  try {
    const { id, title } = req.fields;
    if (title && id) {
      const category = await getCategoryById(id);
      if (category) {
        await updateCategory(category, title);
        res.status(200).json(category);
      } else {
        res.status(409).json({ error: "Pas de catégorie" });
      }
    } else {
      res.status(409).json({ error: "Données manquantes" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
