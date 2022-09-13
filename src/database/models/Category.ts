import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
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

export const Category = mongoose.model("Category", categorySchema);
