const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const User = require("../models/User");

// users list
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
    console.log(username, email);
    if (!email || !username || !password) {
      res.status(400).json({ error: "Données manquantes" });
    } else {
      const user = await User.find().or([
        { email },
        { "account.username": username },
      ]);
      if (user.length > 0) {
        console.log("*******", user);
        res.status(409).json({ error: "L'utilisateur existe déjà" });
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
        // cloudinary
        if (req.files.avatar.size) {
          const resultUpload = await cloudinary.uploader.upload(
            req.files.avatar.path,
            {
              folder: `/photosite/users/${slugify(username)}`,
            }
          );
          newUser.account.avatar = resultUpload;
        }
        await newUser.save();
        res.status(200).json(newUser);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// user login
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.fields;
    const user = await User.findOne({ email: email });
    if (user) {
      const hash = SHA256(password + user.salt).toString(encBase64);
      if (hash !== user.hash) {
        res.status(403).json({ message: "Mot de passe incorrect" });
      } else {
        res.status(200).json({ message: "Login OK" });
      }
    } else {
      res.status(403).json({ message: "Utilisateur non connu" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
