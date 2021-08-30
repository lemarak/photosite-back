const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

const User = require("../models/User");

// user's list
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.status(200).json({ message: "users list" });
});

// user signup
router.post("/user/signup", async (req, res) => {
  try {
    const {
      email,
      username,
      firstname,
      lastname,
      city,
      phone,
      password,
      level,
    } = req.fields;
    if (!email || !username || !password) {
      res.status(400).json({ error: "Données manquantes" });
    } else {
      const user = await User.findOne({ email: email });
      if (user) {
        console.log(user);
        res.status(409).json({ error: "L'email existe déjà" });
      } else {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);
        const newUser = new User({
          email,
          token,
          hash,
          salt,
          account: {
            username,
            firstname,
            lastname,
            city,
            phone,
            level,
          },
        });
        await newUser.save();
        res.status(200).json(newUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// user login
router.post("/user/login", (req, res) => {
  res.status(200).json({ message: "user logged" });
});

module.exports = router;
