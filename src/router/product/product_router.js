const express = require("express");
const router = express.Router();
const passport = require("passport");
const productController = require("../../controller/productcontroller/product_controller");
const { validateCategory, CategorySchema } = require("../../util/validate/schema/category_validate");

// URL = /product

// queryString 의 PRODUCT_CATEGORY를 분별하여 productArray를 return
router.get("/list", 
  passport.authenticate('http-only-cookie', { session: false, failWithError: true }), 
  validateCategory(CategorySchema),
  productController.getProducts
);

// router.post("/add", passport.authenticate('http-only-cookie', { session: false, failWithError: true }), async (req, res, next) => {

// })


module.exports = router;
