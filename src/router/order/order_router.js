const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderController = require('../../controller/order_controller.js');

//상품주문하기
router.post(
  '/orders',
  passport.authenticate('http-only-cookie-use-user', {
    session: false,
    failWithError: true,
  })
);

//구매 상품 조회
router.get(
  '/orders',
  passport.authenticate('http-only-cookie-use-user', {
    session: false,
    failWithError: true,
  }),
  async (req, res) => {
    const userName = req.user.userName;
    const soldProduct = await SoldProduct.find({ userName });
    return res.status(200).json(buildResponse(null, soldProduct));
  }
);

module.exports = router;
