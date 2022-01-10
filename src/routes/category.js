const express = require("express");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const router = express.Router();

// controllers
const {
  createCategory,
  listCategories,
  updateCategory,
} = require("../controllers/category.controllers");

// create
router.post("/category/create", createCategory);

// list
router.get("/categories", listCategories);

//update
router.post("/category/update", updateCategory);

module.exports = router;
