const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const isAuthenticated = require("../middleware/isAuthenticated");
// Controllers
const {
  userDetails,
  userList,
  userUpdate,
  userDelete,
  userSignup,
  userLogin,
} = require("../controllers/user.controllers");

// one user
router.get("/user/:slug", userDetails);

// users list
router.get("/users", userList);

// user update
router.post("/user/update", isAuthenticated, userUpdate);

// user delete
router.delete("/user/delete", userDelete);

// user signup
router.post("/user/signup", userSignup);

// user login
router.post("/user/login", userLogin);

module.exports = router;
