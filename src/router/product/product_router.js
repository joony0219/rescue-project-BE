const express = require("express");
const router = express.Router();
const passport = require("passport");
const productController = require("../../controller/product_controller");
const validateCategory = require("../../util/validate/schema/category_validate");

// queryString 의 PRODUCT_CATEGORY를 분별하여 productArray를 return
router.get("/list", 
  passport.authenticate('http-only-cookie', { session: false, failWithError: true }), 
  validateCategory(),
  productController.getProducts
);

router.post("/add", passport.authenticate('http-only-cookie', { session: false, failWithError: true }), async (req, res, next) => {

})


module.exports = router;
