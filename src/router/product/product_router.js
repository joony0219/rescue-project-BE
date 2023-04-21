const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../dao/userdao/userDAO");
const pino = require('pino')();
const validateProduct = require("../../util/validate/schema/product_validate");
const productService = require('../../service/productservice/product_service');
const commonErrors = require('../../misc/commonErrors');

// queryString 의 PRODUCT_CATEGORY를 분별하여 productArray를 return
router.get("/list", passport.authenticate('http-only-cookie', { session: false, failWithError: true }), async (req, res, next) => {
  const category = req.query.category;
  const offset = parseInt(req.query.offset ? req.query.offset : 0);
  const limit = parseInt(req.query.limit ? req.query.limit : 100);

  if (validateProduct(category) instanceof Error) {
    return res.status(400).json({ error: "Bad request" });
  }
  
  try {
    const productArray = await productService.getProduct(category, offset, limit);
    if (!productArray) {
      return res.status(404).json({ error: "Product_document not found" });
    }
    return res.status(200).json(productArray);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
