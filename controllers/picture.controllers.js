const { getPictures, createPicture } = require("../queries/picture.queries");

// list pictures
exports.listPictures = async (req, res) => {
  try {
    const pictures = await getPictures();
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
    res.status(500).json({ error: error.message });
  }
};
