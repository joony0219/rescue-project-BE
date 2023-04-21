const { Order } = require("./mongoose/model/index");

const OrderDAO = {
  // document 객체를 생성하여 mongoDB에 저장하는 메소드
  async create({ userId, products, totalPrice }) {
    const order = new Order({ userId, products, totalPrice,});
    await order.save();
    // toObject를 이용해서 POJO로 변경.
    return order.toObject();
  },
  // TODO = 필요에 따라 새로운 DAO접근 메소드를 추가
};

module.exports = OrderDAO;
