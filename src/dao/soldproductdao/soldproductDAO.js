const { SoldProduct } = require("./mongoose/model/index");

const SoldProductDAO = {
  async create({ userId, category, name, price, soldCount, color }) {
    const soldProduct = new SoldProduct({ userId, category, name, price, soldCount, color,});
    await soldProduct.save();
    return soldProduct.toObject();
  },
};

module.exports = SoldProductDAO;
