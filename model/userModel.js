const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: "user",
    },
    phoneNumber: {
      type: Number,
      default: 0,
    },
    termsAccepted: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const USER_MODEL = mongoose.model("user-fashions", userSchema);
module.exports = USER_MODEL;
