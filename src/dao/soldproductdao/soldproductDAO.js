const { SoldProduct } = require("./mongoose/model/index");

const SoldProductDAO = {
  // document 객체를 생성하여 mongoDB에 저장하는 메소드
<<<<<<< HEAD
  async create({ user, category, name, price, soldCount, color }) {
    const soldProduct = new SoldProduct({
      user,
=======
  async create({ userId, category, name, price, soldCount, color }) {
    const soldProduct = new SoldProduct({
      userId,
>>>>>>> sub
      category,
      name,
      price,
      soldCount,
      color,
    });
    await soldProduct.save();
    // toObject를 이용해서 POJO로 변경.
    return soldProduct.toObject();
  },
  // TODO = 필요에 따라 새로운 DAO접근 메소드를 추가
};

module.exports = SoldProductDAO;
