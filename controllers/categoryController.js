const CATEGORY_MODEL = require("../model/categoryModel");

module.exports.createCategory = async (req, res) => {
  try {
    let payload = req.body;
    const isCategory = await CATEGORY_MODEL.create(payload);
    if (!isCategory) {
      return res.status(404).json({
        status: false,
        message: "something went wrong on creating caterogy",
      });
    }
    res.status(200).json({
      status: true,
      message: "category created successfully",
      data: isCategory,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const ourCategory = await CATEGORY_MODEL.findByIdAndUpdate(id, req.body);
    if (!ourCategory) {
      return res.status(404).json({
        status: false,
        message: "something went wrong on updated category",
      });
    }
    res.status(200).json({
      status: true,
      message: "category succesfully",
      data: ourCategory,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.getCategory = async (req, res) => {
  try {
    let query = req.query;
    const Categories = await CATEGORY_MODEL.find(query);
    if (Categories.length == 0) {
      return res.status(404).json({
        status: false,
        message: "something went wrong on get category",
      });
    }
    res.status(200).json({
      status: true,
      data: Categories,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.getOnecategory = async (req, res) => {
  try {
    const { id } = req.params;
    const incategory = await CATEGORY_MODEL.findById(id);
    if (!incategory) {
      return res.status(404).json({
        status: false,
        message: "something went wrong on getOne category",
      });
    }
    res.status(200).json({
      status: true,
      message: "getOne succesfully",
      data: incategory,
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.deletecategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CATEGORY_MODEL.findByIdAndDelete(id);
    if (!category) {
      return res.status(401).json({
        status: false,
        message: "something went wrong on delete category",
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
