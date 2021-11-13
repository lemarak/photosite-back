const { getPictures, createPicture } = require("../queries/picture.queries");

// list pictures
exports.listPictures = async (req, res, next) => {
  try {
    const pictures = await getPictures();
    res.status(200).json({ count: pictures.length, pictures });
  } catch (error) {
    next(error);
  }
};

// publish picture
exports.publishPicture = async (req, res, next) => {
  try {
    // no picture
    if (!req.files.picture.size) {
      return res.status("400").json({ message: "no picture" });
    }
    const { title } = req.fields;

    // missing fields
    if (!title) {
      return res.status("400").json({ message: "missing fields" });
    }
    // fields ok

    const newPicture = await createPicture(req.fields, req.user, req.files);

    // update Category
    // ****** TODO ********

    res.status(200).json(newPicture);
  } catch (error) {
    next(error);
  }
};
