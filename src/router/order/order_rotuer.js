const express = require('express');
const {
  orderProduct,
  soldProduct,
} = require('../../service/orderservice/order_service');
const {
  validateSignup,
} = require('../../util/validate/schema/signup_validate');
const router = express.Router();

//상품주문하기
router.post('/orders', validateSignup(signupSchema), orderProduct);

//구매 상품 조회
router.get('/orders', validateSignup(signupSchema), soldProduct);

module.exports = router;
