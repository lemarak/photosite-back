const mongoose = require("mongoose");

const LEVELS = ["débutant", "confirmé", "pro"];

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    username: {
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
});

module.exports = User;
