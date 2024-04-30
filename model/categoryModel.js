const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isDisabled: {
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
const CATEGORY_MODEL = mongoose.model("category-fashions", categorySchema);
module.exports = CATEGORY_MODEL;
