import { Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
}
