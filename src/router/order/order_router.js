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
    const userName = req.user.userName;
    const user = await UserDAO.findByUserName(userName);
    const userId = user._id;
    const me = await User.find({ userName }).select(
      'userName phoneNumber mail address createdAt'
    );
    const order = await Order.find({ userId });
    const products = order.map((v) => {
      return v.products;
    });
    total = {
      user: me,
      order: products,
    };
    return res.status(200).json(buildResponse(null, total));
  }
);

module.exports = router;
