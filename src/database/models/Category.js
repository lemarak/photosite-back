const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Le titre est obligatoire"],
      minlength: [3, "Le titre doit avoir au moins 3 caractères"],
      maxlength: [49, "Le titre doit avoir moins de 50 caractères"],
    },
    pictures: [{ type: mongoose.Types.ObjectId, ref: "Picture" }],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
