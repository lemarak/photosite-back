const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  title: {
    unique: true,
    type: String,
    required: true,
  },
  pictures: [{ type: mongoose.Types.ObjectId, ref: "Picture" }],
});

module.exports = Category;
