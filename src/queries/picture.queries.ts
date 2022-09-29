import { Picture } from "../database/models/Picture";
import { IPicture, PictureFormCreate } from "../interfaces/picture.interface";
import { IUser } from "../interfaces/user.interface";

export const getPictures = () => {
  return Picture.find();
};

export const createPicture = async (
  fields: PictureFormCreate,
  user: IUser,
  filePath: string
) => {
  const { title } = fields;
  let categories: string[];

  if (fields.categories && fields.categories.length) {
    categories = fields.categories.split(",");
  } else {
    categories = [];
  }
  const newPicture: IPicture = new Picture({ title, categories });
  newPicture.owner = user._id;

  newPicture.picture = filePath;
  return Picture.create(newPicture);
};
