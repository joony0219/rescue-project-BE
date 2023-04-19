const express = require('express');
const isAuth = require('../utils/token');
const orderRouter = express.Router();
const SoldProduct = require('../dao/soldproductdao/mongoose/model');
const Order = require('../dao/orderdao/mongoose/model');
//상품 구매
orderRouter.post('/orders', isAuth, (req, res) => {
  const userId = req.user._id;
  const { products, totalPrice} = req.body
  const purchase = await Order.create({userId, products, totalPrice,});
  res.send(purchase)
});

//구매 목록
orderRouter.get('/orders', isAuth, async (req, res) => {
  const list = await SoldProduct.find({});
  res.send(list);
});

module.exports = orderRouter;
