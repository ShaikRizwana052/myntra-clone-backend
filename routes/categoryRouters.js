const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.post("/create-category", categoryController.createCategory);

router.get("/all-category", categoryController.getCategory);

router.get("/one-category", categoryController.getOnecategory);

router.patch("/update-category", categoryController.updateCategory);

router.delete("/delete-category", categoryController.deletecategory);

module.exports = router;
