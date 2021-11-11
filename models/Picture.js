const mongoose = require("mongoose");
const schema = mongoose.Schema;

const pictureSchema = schema(
  {
    title: {
      type: String,
      required: true,
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
