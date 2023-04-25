const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderController = require('../../controller/order_controller.js');
const SoldProduct = require('../../dao/soldproductdao/mongoose/model/soldproduct_model.js');
const UserDAO = require('../../dao/userdao/userDAO.js');
const {
  validateOrder,
} = require('../../middleware/validate/schema/order_validate.js');

// /order/

// user order
router.post(
  '/',
  passport.authenticate('http-only-cookie-use-user', {
    session: false,
    failWithError: true,
  }),
  validateOrder,
  orderController.postOrder
);

//구매 상품 조회
router.get(
  '/orders',
  passport.authenticate('http-only-cookie-use-user', {
    session: false,
    failWithError: true,
  }),
  async (req, res) => {
    const user = await UserDAO.findByUserName(userName);
    const userId = user._id;
    const soldProduct = await SoldProduct.find({ userId });
    return res.status(200).json(buildResponse(null, soldProduct));
  }
);

module.exports = router;
