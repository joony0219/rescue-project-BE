const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderController = require('../../controller/order_controller.js');
const { validateOrder } = require("../../middleware/validate/schema/order_validate.js");

// /order/

// user order
router.post(
  '/',
  passport.authenticate('http-only-cookie-use-user', { session: false, failWithError: true }),
  validateOrder,
  orderController.postOrder
);


module.exports = router;
