const mongoose = require("mongoose");
const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-fashions",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product-fashions",
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const CART_MODEL = mongoose.model("cart-fashions", cartSchema);
module.exports = CART_MODEL;
