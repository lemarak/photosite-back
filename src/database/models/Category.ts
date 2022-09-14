import mongoose from "mongoose";
import { ICategory } from "../../interfaces";

const Schema = mongoose.Schema;

const categorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Le titre est obligatoire"],
      minlength: [3, "Le titre doit avoir au moins 3 caractères"],
      maxlength: [49, "Le titre doit avoir moins de 50 caractères"],
    },
    picture: { type: mongoose.Types.ObjectId, ref: "Picture" },
    pictures: [{ type: mongoose.Types.ObjectId, ref: "Picture" }],
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
