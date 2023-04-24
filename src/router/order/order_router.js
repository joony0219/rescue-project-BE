const express = require('express');
const passport = require('passport');

const router = express.Router();
const {
  orderProduct,
  soldProduct,
} = require('../../service/order_service');

//상품주문하기
router.post(
  '/orders',
  passport.authenticate('http-only-cookie', {
    session: false,
    failWithError: true,
  }),
  orderProduct
);

//구매 상품 조회
router.get(
  '/orders',
  passport.authenticate('http-only-cookie', {
    session: false,
    failWithError: true,
  })
);

module.exports = router;
