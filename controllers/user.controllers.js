const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const slugify = require("slugify");

// queries
const {
  getUserBySlug,
  getUserByToken,
  getUserByMail,
  getUserWithOr,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../queries/user.queries");

// One user
exports.userDetails = async (req, res, next) => {
  try {
    const user = await getUserBySlug(req.params.slug);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

// users list
exports.userList = async (req, res, next) => {
  try {
    // console.log("req", req);
    const users = await getUsers();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// user update
exports.userUpdate = async (req, res, next) => {
  try {
    const user = await getUserByToken(req.user.token);
    if (user) {
      await updateUser(req.fields, user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

// user Delete
exports.userDelete = async (req, res, next) => {
  try {
    if (req.fields.id) {
      await deleteUser(req.fields.id);
      res.status(200).json({ message: "Utilisateur supprimé" });
    } else {
      res.status(500).json({ error: "Pas d'utilisateurs avec l'id" });
    }
  } catch (error) {
    next(error);
  }
};

// user Signup
exports.userSignup = async (req, res, next) => {
  try {
    const { email, username, password } = req.fields;

    if (!email || !username || !password) {
      res.status(400).json({ error: "Données manquantes" });
    } else {
      const slug = slugify(username);
      const user = await getUserWithOr(email, username, slug);

      if (user.length > 0) {
        res.status(409).json({ error: "L'utilisateur existe déjà" });
      } else {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);

        const newUser = await createUser(req.fields, slug, token, hash, salt);
        res.status(200).json(newUser);
      }
    }
  } catch (error) {
    next(error);
  }
};

// Login
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.fields;
    const user = await getUserByMail(email);
    if (user) {
      const hash = SHA256(password + user.salt).toString(encBase64);
      if (hash !== user.hash) {
        res.status(403).json({ message: "Mot de passe incorrect" });
      } else {
        res.status(200).json({ user });
      }
    } else {
      res.status(403).json({ message: "Utilisateur non connu" });
    }
  } catch (error) {
    next(error);
  }
};
