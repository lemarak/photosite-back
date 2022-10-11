import { Request, Response, NextFunction } from "express";
import uid2 from "uid2";
import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";
import slugify from "slugify";
import createError from "http-errors";

import { IGetUserAuthenticated, IUser } from "../interfaces";

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
export const userDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = await getUserBySlug(req.params.slug);
    if (user) {
      res.status(200).json(user);
    } else {
      throw createError(404, "Utilisateur non trouvé");
      // res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

// users list
export const userList = async (_: any, res: Response, next: NextFunction) => {
  try {
    const users: IUser[] = await getUsers();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// user update
export const userUpdate = async (
  req: IGetUserAuthenticated,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = await getUserByToken(req.user.token);
    if (user) {
      await updateUser(req.body, user);
      res.status(200).json(user);
    } else {
      throw createError(404, "Utilisateur non trouvé");
    }
  } catch (error) {
    next(error);
  }
};

// user Delete
export const userDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body!.id) {
      await deleteUser(req.body.id);
      res.status(200).json({ message: "Utilisateur supprimé" });
    } else {
      throw createError(404, "Utilisateur non trouvé");
    }
  } catch (error) {
    next(error);
  }
};

// user Signup
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body;
    console.log(req.body);
    if (!email || !username || !password) {
      console.log(`${email}, ${username}, ${password}`);
      res.status(400).json({ error: "Données manquantes" });
    } else {
      const slug = slugify(username as string);
      const user: IUser = await getUserWithOr(email, username, slug);
      if (user) {
        res.status(409).json({ error: "L'utilisateur existe déjà" });
      } else {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);

        const newUser: IUser = await createUser(
          req.body,
          slug,
          token,
          hash,
          salt
        );
        res.status(200).json(newUser);
      }
    }
  } catch (error) {
    next(error);
  }
};

// Login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
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
