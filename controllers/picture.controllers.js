const Picture = require("../database/models/Picture");
const Category = require("../database/models/Category");

// list pictures
exports.listPictures = async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.status(200).json({ count: pictures.length, pictures });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// publish picture
exports.publishPicture = async (req, res) => {
  try {
    // no picture
    if (!req.files.picture.size) {
      return res.status("400").json({ message: "no picture" });
    }
    const { title } = req.fields;

    let categories;
    if (req.fields.categories) {
      categories = req.fields.categories.split(",");
    } else {
      categories = [];
    }

    // missing fields
    if (!title) {
      return res.status("400").json({ message: "missing fields" });
    }
    // fields ok
    const newPicture = new Picture({ title, categories });
    newPicture.owner = req.user;
    const resultUpload = await cloudinary.uploader.upload(
      req.files.picture.path,
      {
        folder: `/photosite/pictures/${slugify(req.user.account.username)}`,
      }
    );
    newPicture.picture = resultUpload;

    await newPicture.save();

    // update Category
    // ****** TODO ********

    res.status(200).json(newPicture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
