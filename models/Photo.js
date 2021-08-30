const mongoose = require("mongoose");

const Photo = mongoose.model("Photo", {
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
  published: { type: Date, default: Date.now },
});

module.exports = Photo;
