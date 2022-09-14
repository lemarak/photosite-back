import express from "express";
// const cloudinary = require("cloudinary").v2;
// const slugify = require("slugify");

const router = express.Router();

// controllers
const {
  newCategory,
  listCategories,
  updateCategory,
} = require("../controllers/category.controllers");

// create
router.post("/category/create", newCategory);

// list
router.get("/categories", listCategories);

//update
router.post("/category/update", updateCategory);

export default router;
