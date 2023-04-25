const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderController = require('../../controller/order_controller.js');

//상품주문하기
router.post(
  '/orders',
  passport.authenticate('http-only-cookie-use-user', { session: false, failWithError: true }),
  

);


module.exports = router;
