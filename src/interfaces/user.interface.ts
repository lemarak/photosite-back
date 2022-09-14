import { Document } from "mongoose";
import { Request } from "express";

enum Level {
  Beginner = "débutant",
  Intermediate = "intermédiaire",
  Professional = "pro",
}

export interface IAccount {
  username: string;
  slug: string;
  firstname?: string;
  lastname?: string;
  city?: string;
  phone?: string;
  avatar?: string;
  level?: Level;
}

export interface IUser extends Document {
  email: string;
  account: IAccount;
  token: string;
  hash: string;
  salt: string;
}

export interface UserFormCreate {
  email: string;
  username: string;
}

export interface UserFormUpdate {
  firstname?: string;
  lastname?: string;
  city?: string;
  phone?: string;
  level?: Level;
}

export interface IGetUserAuthenticated extends Request {
  user: IUser;
}
