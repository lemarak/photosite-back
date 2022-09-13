import { Document } from "mongoose";
import { IUser } from "../interfaces/user.interface";
export interface IPicture extends Document {
  title: string;
  picture: string;
  owner: IUser;
  categories?: string; //Todo
}

export interface PictureFormCreate {
  title: string;
  categories: string; //Todo
}
