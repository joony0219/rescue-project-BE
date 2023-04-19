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

  // category에 해당하는 제품들을 반환하는 메소드
  async getProductsByCategory(category) {
    const products = await Product.find({ category: category }).select("-_id -__v");
    return products;
  }
};

module.exports = productDAO;