const { Order } = require('../../dao/orderdao/mongoose/model');
const OrderDAO = require('../../dao/orderdao/orderDAO');
const SoldProduct = require('../../dao/soldproductdao/soldproductDAO');

//상품 구매

const orderProduct = async (req, res) => {
  const userName = req.user.userName;
  const { products, totalPrice } = req.body;
  const order = await OrderDAO.create({ userName, products, totalPrice });
  const sold = await SoldProduct.create(order);
  res.send(sold);
};

//구매 목록 조회
const soldProduct = async (req, res) => {
  const userName = req.user.userName;
  const user = await SoldProduct.find({ userName });
  res.send(user);
};

module.exports = { orderProduct, soldProduct };
