import { Request } from "express";
import { Document, Types } from "mongoose";
import { IPicture } from "./picture.interface";

export interface ICategory extends Document {
  title: string;
  picture?: Types.ObjectId;
  pictures?: Types.ObjectId[];
}

export interface IGetCategory extends Request {
  picture: IPicture;
}
