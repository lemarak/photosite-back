import { Response, NextFunction } from "express";
import { IGetPicture, IPicture } from "../interfaces";

const { getPictures, createPicture } = require("../queries/picture.queries");

// list pictures
export const listPictures = async (
  _: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const pictures = await getPictures();
    res.status(200).json({ count: pictures.length, pictures });
  } catch (error) {
    next(error);
  }
};

// publish picture
export const publishPicture = async (
  req: IGetPicture,
  res: Response,
  next: NextFunction
) => {
  try {
    // no picture
    if (!req.files) {
      return res.status(400).json({ message: "no picture" });
    }

    const { title } = req.fields!;

    // missing fields
    if (!title) {
      return res.status(400).json({ message: "missing fields" });
    }
    // fields ok

    const newPicture: IPicture = await createPicture(
      req.fields,
      req.user,
      req.files
    );

    // update Category
    // ****** TODO ********

    res.status(200).json(newPicture);
  } catch (error) {
    next(error);
  }
};
