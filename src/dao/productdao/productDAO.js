const { Product } = require("./mongoose/model/product_model");
const logger = require("../../util/logger/pino.js");

const productDAO = {
  async create({ category, name, price, count, color, specifications, handlingPrecautions }) {
    const product = new Product({ category, name, price, count, color, specifications, handlingPrecautions });
    await product.save();
    return product.toObject();
  },

  async createMany(products) {
    const results = await Product.insertMany(products);
    return results.map(result => result.toObject());
  },

  async findProductsByCategory(category, offset, limit) {
    const products = await Product.find({ category: category }).select("-__v")
                                  .skip(offset)
                                  .limit(limit)
                                  .exec();
    return products;
  },

  async findProductById(id) {
    const product = await Product.findById(id);
    return product;
  }

};

module.exports = productDAO;