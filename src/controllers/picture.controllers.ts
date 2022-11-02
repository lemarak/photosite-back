import { Response, NextFunction } from "express";

import { IGetPicture, IPicture } from "../interfaces";

import { getPictures, createPicture } from "../queries/picture.queries";

// list pictures
export const listPictures = async (
  _: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const pictures: IPicture[] = await getPictures();
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
  // upload.single("picture");
  try {
    // no picture
    if (!req.file) {
      return res.status(400).json({ message: "no picture" });
    }

    // missing fields
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    // fields ok

    const filePath: string = `/img/pictures/${req.file.filename}`;
    const newPicture: IPicture = await createPicture(
      req.body,
      req.user,
      filePath
    );

    // update Category
    // ****** TODO ********

    res.status(200).json(newPicture);
  } catch (error) {
    next(error);
  }
};
