const { Product } = require("./mongoose/model/product_model");

const productDAO = {
  // document 객체를 생성하여 mongoDB에 저장하는 메소드
  async create({
    category,
    name,
    price,
    count,
    color,
    specifications,
    handlingPrecautions,
  }) {
    const product = new Product({
      category,
      name,
      price,
      count,
      color,
      specifications,
      handlingPrecautions,
    });
    await product.save();
    // toObject를 이용해서 POJO로 변경.
    return product.toObject();
  },
  // TODO = 필요에 따라 새로운 DAO접근 메소드를 추가
};

module.exports = productDAO;
