const cloudinary = require("cloudinary").v2;

const User = require("../database/models/User");

exports.getUserBySlug = (slug) => {
  return User.findOne({ "account.slug": slug }).exec();
};

exports.getUserByToken = (token) => {
  return User.findOne({ token }).exec();
};

exports.getUserByMail = (email) => {
  return User.findOne({ email }).exec();
};

exports.getUserWithOr = (email, username, slug) => {
  return User.find()
    .or([{ email }, { "account.username": username }, { "account.slug": slug }])
    .exec();
};

exports.getUsers = () => {
  return User.find({});
};

exports.createUser = (fields, slug, token, hash, salt) => {
  const { email, username } = fields;
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

  return User.create(newUser);
};

exports.updateUser = (fields, user) => {
  const { firstname, lastname, city, phone, level } = fields;
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

  return user.save();
};

exports.deleteUser = (userId) => {
  return User.findByIdAndDelete(userId).exec();
};
