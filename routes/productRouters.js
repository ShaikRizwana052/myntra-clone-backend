const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authorization } = require("../middelwares/authorization");
const { authentication } = require("../middelwares/authentication");

router.get("/all-product", productController.allProduct);

router.get("/one-product/:id", productController.getOneProduct);

router.use(authentication);

router.post("/create-product", productController.createProduct);

router.patch(
  "/update-product/:id",
  authorization(["admin"]),
  productController.updateProduct
);

router.delete(
  "/delete-product/:id",
  authorization(["admin"]),
  productController.deleteProduct
);

module.exports = router;
