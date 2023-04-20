const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../dao/userdao/userDAO");
const pino = require('pino');
const productValidation = require("../../util/validate/schema/product_validate");
const productService = require('../../service/productservice/product_service');
const commonErrors = require('../../misc/commonErrors');

// queryString 의 PRODUCT_CATEGORY를 분별하여 productArray를 return
router.get("/list", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  
  const category = req.query.category;
  const offset = parseInt(req.query.offset ? req.query.offset : 0);
  const limit = parseInt(req.query.offset ? req.query.offset : 100);

  if (productValidation(category) instanceof Error) {
    return res.status(400).json({ error: "Invalid product request param" });
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


// 임시 로그인, 토큰 지급
router.post("/signup", async (req, res) => {
  
  const { userName, password } = req.body;

  try {
    // 유저 정보를 저장합니다
    const user = User.create({userName, password});

    // JWT 토큰을 생성합니다
    const token = jwt.sign({ userName: userName }, "f7cbc47fb2a659f6d859db2873c4c6a6f1a341a10a2fac06d176c5411e642339554cc767a628fe66f2ffab7dacb0fb0b14265e6dfdd353dd1417d32a8473e114");

    // JWT 토큰을 반환합니다
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
