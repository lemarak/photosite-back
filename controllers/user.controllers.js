const User = require("../database/models/User");

// queries
const { getUser } = require("../queries/user.queries");

// One user
exports.userDetails = async (req, res) => {
  try {
    const user = await User.findOne({ "account.slug": req.params.slug });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// users list
exports.userList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user update
exports.userUpdate = async (req, res) => {
  try {
    const { firstname, lastname, city, phone, level } = req.fields;

    const user = await User.findOne({ token: req.user.token });
    if (user) {
      if (firstname) {
        user.account.firstname = firstname;
      }
      if (lastname) {
        user.account.lastname = lastname;
      }
      if (city) {
        user.account.city = city;
      }
      if (phone) {
        user.account.phone = phone;
      }
      if (level) {
        user.account.level = level;
      }
      // cloudinary
      // console.log(req.files.avatar);
      // if (req.files.avatar.size > 0) {
      //   const resultUpload = await cloudinary.uploader.upload(
      //     req.files.avatar.path,
      //     {
      //       folder: `/photosite/users/${user.account.slug}`,
      //     }
      //   );
      //   user.account.avatar = resultUpload;
      // }
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user Delete
exports.userDelete = async (req, res) => {
  try {
    if (req.fields.id) {
      await User.findByIdAndDelete(req.fields.id);
      res.status(200).json({ message: "Utilisateur supprimé" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user Signup
exports.userSignup = async (req, res) => {
  try {
    const { email, username, password } = req.fields;

    if (!email || !username || !password) {
      res.status(400).json({ error: "Données manquantes" });
    } else {
      const slug = slugify(username);
      const user = await User.find().or([
        { email },
        { "account.username": username },
        { "account.slug": slug },
      ]);

      if (user.length > 0) {
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
            slug,
            // firstname,
            // lastname,
            // city,
            // phone,
            // level,
          },
        });
        console.log(newUser);
        // cloudinary
        // if (req.files.avatar.size) {
        //   const resultUpload = await cloudinary.uploader.upload(
        //     req.files.avatar.path,
        //     {
        //       folder: `/photosite/users/${slugify(username)}`,
        //     }
        //   );
        //   newUser.account.avatar = resultUpload;
        // }
        await newUser.save();
        res.status(200).json(newUser);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.fields;
    const user = await User.findOne({ email: email });
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
    res.status(500).json({ error: error.message });
  }
};
