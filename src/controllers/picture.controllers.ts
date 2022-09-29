import { Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import {
  IGetPicture,
  IPicture,
  DestinationCallback,
  FileNameCallback,
} from "../interfaces";

import { getPictures, createPicture } from "../queries/picture.queries";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_: any, __: any, cb: DestinationCallback) => {
      cb(null, path.join(__dirname, "../public/img/pictures"));
    },
    filename: (_: any, file: Express.Multer.File, cb: FileNameCallback) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

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
  upload.single("picture");
  try {
    // no picture
    console.log(req.files);
    if (!req.files) {
      return res.status(400).json({ message: "no picture" });
    }

    // missing fields
    if (!req.fields) {
      return res.status(400).json({ message: "missing fields" });
    }
    // fields ok

    const filePath: string = `img/pictures/${req.files!.filename}`;
    const newPicture: IPicture = await createPicture(
      req.fields,
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
