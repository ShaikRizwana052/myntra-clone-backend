const express=require("express");
const router=express.Router();
const cartController=require("../controllers/cartController")

router.post("/create-cart",cartController.addToCart);

router.get("/all-cart",cartController.viewCart);

router.get("/getall-cart",cartController.viewAllCart);

router.patch("/update-cart/:id",cartController.updatecart);

router.delete("/delete-cart/:id",cartController.deletecart);

router.delete("/deleteAll-cart",cartController.deleteAllCart);

module.exports=router;