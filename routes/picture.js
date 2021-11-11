const express = require("express");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");
// controllers
const {
  listPictures,
  publishPicture,
} = require("../controllers/picture.controllers");

// list pictures
router.get("/pictures", listPictures);

// publish picture
router.post("/picture/publish", isAuthenticated, publishPicture);

module.exports = router;
