const express = require("express");
const router = express.Router();
const passport = require("passport");
const productController = require("../../controller/product_controller.js");
const { validateCategory } = require("../../middleware/validate/schema/category_validate.js");
const { validateProducts, validateProductId } = require("../../middleware/validate/schema/product_validate.js");

// URL = /product

// queryString 의 PRODUCT_CATEGORY를 분별하여 productArray를 return
router.get("/list", 
  passport.authenticate('http-only-cookie', { session: false, failWithError: true }), 
  validateCategory,
  productController.getProducts
);

router.get("/detail",
  passport.authenticate('http-only-cookie', { session: false, failWithError: true }),
  validateProductId,
  productController.getOneProduct
)

// need admin verify
router.post("/add",
 passport.authenticate('http-only-cookie-use-admin', { session: false, failWithError: true }),
 validateProducts,
 productController.postProducts
)


module.exports = router;
