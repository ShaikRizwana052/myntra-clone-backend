const { default: mongoose } = require("mongoose");
const PRODUCT_MODEL = require("../model/productModel");

module.exports.createProduct = async (req, res) => {
  try {
    const payload = req.body;
    const isProduct = await PRODUCT_MODEL.create(payload);
    if (!isProduct) {
      return res.status(404).json({
        status: false,
        message: "something went wrong on creating product",
      });
    }

    res.status(200).json({
      status: true,
      message: "product created successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const ourProduct = await PRODUCT_MODEL.findByIdAndUpdate(id, req.body);
    if (!ourProduct) {
      return res.status(401).json({
        status: false,
        message: "something went wrong on updated product",
      });
    }
    res.status(200).json({
      status: true,
      message: "updated succesfully",
      data: ourProduct,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.allProduct = async (req, res) => {
  try {
    let query = req.query || {};
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 15;
    let skip = (page - 1) * limit;
    const { categoryId = null } = query;
    delete query.page;
    delete query.limit;
    delete query.categoryId;

    if (categoryId) {
      query.categoryId = new mongoose.Types.ObjectId(categoryId);
    }
    const [Products, totalDocuments] = await Promise.all([   
      await PRODUCT_MODEL.aggregate([
        {
          $match: query,
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: "category-fashions",
            localField: "categoryId",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $unwind: {
            path: "$categories",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]),
      PRODUCT_MODEL.countDocuments(query),
    ]);
    if (Products.length == 0) {
      return res.status(401).json({
        status: false,
        message: "something went wrong on get product",
      });
    }

    res.status(200).json({
      status: true,
      data: Products,
      totalDocuments,
      page,
      limit,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isProduct = await PRODUCT_MODEL.findById(id);
    if (!isProduct) {
      return res.status(404).json({
        status: false,
        message: "something went wrong on getOne product",
      });
    }
    res.status(200).json({
      status: true,
      message: "getOne succesfully",
      data: isProduct,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isProduct = await PRODUCT_MODEL.findByIdAndDelete(id);
    if (!isProduct) {
      return res.status(404).json({
        status: false,
        message: "something went wrong on delete product",
      });
    }
    res.status(200).json({
      status: true,
      message: "deleted succesfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};
