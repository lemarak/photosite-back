import express from "express";

const router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");
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

export default router;
