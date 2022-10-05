import { User } from "../database/models/User";
import { IUser, IUserFormCreate, UserFormUpdate } from "../interfaces";

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
  return User.findOne()
    .or([{ email }, { "account.username": username }, { "account.slug": slug }])
    .exec();
};

export const getUsers = () => {
  return User.find({});
};

export const createUser = (
  fields: IUserFormCreate,
  slug: string,
  token: string,
  hash: string,
  salt: string
) => {
  const { email, username, firstname, lastname, city, phone } = fields;
  const newUser = new User({
    email,
    token,
    hash,
    salt,
    account: {
      username,
      slug,
      firstname,
      lastname,
      city,
      phone,
      // level,
    },
  });

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

  return user.save();
};

export const deleteUser = (userId: string) => {
  return User.findByIdAndDelete(userId).exec();
};
