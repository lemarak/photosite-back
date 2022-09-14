import { Document, Types } from "mongoose";

export interface IPicture extends Document {
  title: string;
  picture: string;
  owner: Types.ObjectId;
  categories?: string; //Todo
}

export interface PictureFormCreate {
  title: string;
  categories: string; //Todo
}
