const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = schema(
  {
    title: {
      unique: true,
      type: String,
      required: true,
    },
    pictures: [{ type: mongoose.Types.ObjectId, ref: "Picture" }],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
