const { Order } = require("./mongoose/model/index");

const OrderDAO = {
  async create({ userId, products, totalPrice }) {
    const order = new Order({ userId, products, totalPrice,});
    await order.save();
    return order.toObject();
  },
};

module.exports = OrderDAO;
