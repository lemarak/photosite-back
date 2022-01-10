const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const Picture = require("../database/models/Picture");

exports.getPictures = () => {
  return Picture.find();
};

exports.createPicture = async (fields, user, files) => {
  const { title } = fields;
  let categories;
  if (fields.categories) {
    categories = fields.categories.split(",");
  } else {
    categories = [];
  }
  const newPicture = new Picture({ title, categories });
  newPicture.owner = user;

  const resultUpload = await cloudinary.uploader.upload(files.picture.path, {
    folder: `/photosite/pictures/${slugify(user.account.username)}`,
  });
  newPicture.picture = resultUpload;
  return Picture.create(newPicture);
};
