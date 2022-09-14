import { Document, Types } from "mongoose";

export interface ICategory extends Document {
  title: string;
  picture?: Types.ObjectId;
  pictures?: Types.ObjectId[];
}
