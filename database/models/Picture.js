const mongoose = require("mongoose");
const schema = mongoose.Schema;

const pictureSchema = schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      minlength: [3, "Le titre doit avoir au moins 3 caractères"],
      maxlength: [49, "Le titre doit avoir moins de 50 caractères"],
    },
    picture: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
