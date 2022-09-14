import mongoose from "mongoose";
import { IPicture } from "../../interfaces";

const Schema = mongoose.Schema;

const pictureSchema = new Schema<IPicture>(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      minlength: [3, "Le titre doit avoir au moins 3 caractères"],
      maxlength: [49, "Le titre doit avoir moins de 50 caractères"],
    },
    picture: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

export const Picture = mongoose.model<IPicture>("Picture", pictureSchema);
