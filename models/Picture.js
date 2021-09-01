const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
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
  published: { type: Date, default: Date.now },
});

module.exports = Picture;
