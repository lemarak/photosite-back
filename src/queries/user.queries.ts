const cloudinary = require("cloudinary").v2;

import { User } from "../database/models/User";
import { IUser, UserFormCreate, UserFormUpdate } from "../interfaces";

export const getUserBySlug = (slug: string) => {
  return User.findOne({ "account.slug": slug }).exec();
};

export const getUserByToken = (token: string) => {
  return User.findOne({ token }).exec();
};

export const getUserByMail = (email: string) => {
  return User.findOne({ email }).exec();
};

export const getUserWithOr = (
  email: string,
  username: string,
  slug: string
) => {
  return User.find()
    .or([{ email }, { "account.username": username }, { "account.slug": slug }])
    .exec();
};

export const getUsers = () => {
  return User.find({});
};

export const createUser = (
  fields: UserFormCreate,
  slug: string,
  token: string,
  hash: string,
  salt: string
) => {
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

export const updateUser = (fields: UserFormUpdate, user: IUser) => {
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

export const deleteUser = (userId: string) => {
  return User.findByIdAndDelete(userId).exec();
};
