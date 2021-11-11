const mongoose = require("mongoose");
const schema = mongoose.Schema;

const LEVELS = ["débutant", "confirmé", "pro"];

const userSchema = schema(
  {
    email: {
      unique: true,
      type: String,
    },
    account: {
      username: {
        unique: true,
        required: true,
        type: String,
      },
      slug: {
        unique: true,
        required: true,
        type: String,
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
