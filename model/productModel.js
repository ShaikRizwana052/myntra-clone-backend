const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category-fashions",
    },
    productName: {
      type: String,
      trim: true,
    },
    productImage: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
      enum: ["mens", "womens", "kids"],
      default: "mens",
    },
    price: {
      type: Number,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      default: 0,
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
const PRODUCT_MODEL = mongoose.model("product-fashions", productSchema);
module.exports = PRODUCT_MODEL;
