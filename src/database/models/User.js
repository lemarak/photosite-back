const mongoose = require("mongoose");
const schema = mongoose.Schema;

const LEVELS = ["débutant", "confirmé", "pro"];

const userSchema = schema(
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

const User = mongoose.model("User", userSchema);

module.exports = User;
