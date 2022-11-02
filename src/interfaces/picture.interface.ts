import { Types } from "mongoose";
import { Request } from "express";
import { IUser } from "./user.interface";

export interface IPicture {
  title: string;
  picture: string;
  owner: Types.ObjectId;
  categories?: string; //Todo
}

export interface PictureFormCreate {
  title?: string;
  categories?: string; //Todo
}

export interface IGetPicture extends Request {
  picture: IPicture;
  user: IUser;
}

export type DestinationCallback = (
  error: Error | null,
  destination: string
) => void;
export type FileNameCallback = (error: Error | null, filename: string) => void;
