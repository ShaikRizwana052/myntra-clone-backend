const { default: mongoose } = require("mongoose");
const CART_MODEL = require("../model/cartModel");

module.exports.updatecart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const isCart = await CART_MODEL.findByIdAndUpdate(id, {
      $set: { quantity },
    });
    if (!isCart) {
      return res.status(401).json({
        status: false,
        message: "something went wrong on update cart",
      });
    }
    res.status(200).json({
      status: true,
      message: "cart updated successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.deletecart = async (req, res) => {
  try {
    const { id } = req.params;
    const inCart = await CART_MODEL.findByIdAndDelete(id);
    if (!inCart) {
      return res.status(401).json({
        status: false,
        message: "something went wrong on delete cart",
      });
    }
    res.status(200).json({
      status: true,
      message: "cart deleted successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.deleteAllCart = async (req, res) => {
  try {
    const { user } = req.body;
    const deleteCart = await CART_MODEL.deleteMany({ userId: user.id });
    if (!deleteCart) {
      return res.status(401).json({
        status: false,
        message: "something went wrong on delete cart",
      });
    }
    res.status(200).json({
      status: true,
      message: "Delete all cart successfully..",
      data: deleteCart,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    const { user, productId, quantity } = req.body;
    const cart = await CART_MODEL.findOne({
      userId: user.id,
      productId: productId,
    });
    if (cart) {
      cart.quantity += quantity;
      await cart.save();
    } else {
      const newCart = {
        userId: user.id,
        productId: productId,
        quantity: quantity,
      };

      await CART_MODEL.create(newCart);
    }
    res.status(200).json({
      status: true,
      message: "Item is added to cart successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.viewCart = async (req, res) => {
  try {
    const { user } = req.body;
    const isCart = await CART_MODEL.find({ userId: user.id }).populate(
      "productId"
    );
    if (isCart.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }
    const totalAmount = isCart.reduce((acc, item) => {
      acc = item?.productId?.price * item?.quantity;
      return acc;
    }, 0);
    res.status(200).json({
      status: true,
      message: "get data successfully",
      data: isCart,
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.viewAllCart = async (req, res) => {
  try {
    let { user } = req.body;

    const isCarts = await await CART_MODEL.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(user.id) },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "product-fashions",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    if (isCarts.length == 0) {
      return res.status(401).json({
        status: false,
        message: "something went wrong on get cart..",
      });
    }

    const { totalAmount, totalQty } = isCarts.reduce(
      (acc, item) => {
        acc.totalAmount += item.product.price * item.quantity;
        acc.totalQty += item.quantity;
        return acc;
      },
      { totalAmount: 0, totalQty: 0 }
    );

    res.status(200).json({
      status: true,
      message: "Cart get successfully..",
      data: isCarts,
      totalAmount,
      totalQty,
    });
  } catch (error) {
    console.log("error", error);
  }
};
