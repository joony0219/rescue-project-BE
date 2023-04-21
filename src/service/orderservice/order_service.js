const { Order } = require('../../dao/orderdao/mongoose/model');
const { SoldProduct } = require('../../dao/soldproductdao/mongoose');

//상품 구매
export const orderProduct = async (req, res) => {
  const _id = req.user._id;
  const { products, totalPrice } = req.body;
  const order = await Order.create({ _id, products, totalPrice });
  res.send(order);
};

//
export const soldProduct = async (req, res) => {
  const _id = req.user._id;
  const user = await Order.find({ _id });
  res.send(user);
};
