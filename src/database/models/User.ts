import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LEVELS = ["Beginner", "Intermediate", "Professional"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "L'email est obligatoire"],
    },
    account: {
      username: {
        type: String,
        unique: true,
        required: [true, "Le pseudo est obligatoire"],
        minlength: [3, "Le pseudo doit avoir au moins 3 caractères"],
        maxlength: [49, "Le pseudo doit avoir moins de 50 caractères"],
      },
      slug: {
        type: String,
        unique: true,
        required: true,
      },
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      city: String,
      phone: String,
      avatar: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      level: [{ type: String, enum: LEVELS }],
    },
    token: String,
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
