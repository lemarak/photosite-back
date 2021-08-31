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
  published: { type: Date, default: Date.now },
});

module.exports = Picture;
