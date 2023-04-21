const express = require('express');
const passport = require('passport');

const {
  orderProduct,
  soldProduct,
} = require('../../service/orderservice/order_service');
const {
  validateSignup,
} = require('../../util/validate/schema/signup_validate');
const router = express.Router();

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
  }),
  soldProduct
);

module.exports = router;
