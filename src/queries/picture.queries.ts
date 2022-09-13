const cloudinary = require("cloudinary").v2;
import slugify from "slugify";

import { Picture } from "../database/models/Picture";
import { IPicture, PictureFormCreate } from "../interfaces/picture.interface";
import { IUser } from "../interfaces/user.interface";

exports.getPictures = () => {
  return Picture.find();
};

exports.createPicture = async (
  fields: PictureFormCreate,
  user: IUser,
  files: any
) => {
  const { title } = fields;
  let categories: string[];

  if (fields.categories && fields.categories.length) {
    categories = fields.categories.split(",");
  } else {
    categories = [];
  }
  const newPicture: IPicture = new Picture({ title, categories });
  newPicture.owner = user;

  const resultUpload = await cloudinary.uploader.upload(files.picture.path, {
    folder: `/photosite/pictures/${slugify(user.account.username)}`,
  });
  newPicture.picture = resultUpload;
  return Picture.create(newPicture);
};
