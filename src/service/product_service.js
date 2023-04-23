const productDAO = require('../dao/productdao/productDAO');
const { PRODUCT_CATEGORY } = require('../util/commonenum/product_category');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors.js');
const logger = require("../util/logger/pino.js");

const productService = {
  async getProducts(category, offset, limit) {
    switch (category) {
      case PRODUCT_CATEGORY.TEA:
        return await productDAO.findProductsByCategory('TEA', offset, limit).catch((error) => {
          logger.info(error); 
          throw new AppError(commonErrors.businessError, 500, "Internal Server Error")});
      case PRODUCT_CATEGORY.MUG:
        return await productDAO.findProductsByCategory('MUG', offset, limit).catch((error) => {
          logger.info(error); 
          throw new AppError(commonErrors.businessError, 500, "Internal Server Error")});
      case PRODUCT_CATEGORY.TUMBLER:
        return await productDAO.findProductsByCategory('TUMBLER', offset, limit).catch((error) => {
          logger.info(error); 
          throw new AppError(commonErrors.businessError, 500, "Internal Server Error")});
      default:
        logger.info("category ENUM is not matched");
        throw new AppError("Wrong category Error", 404, "Not found");
    }
  },

  async addProduct(products) {
    if (!products || products.length === 0) {
      logger.info("not invalid products type");
      throw new AppError(commonErrors.inputError, 400, "Bad request");
    }
    const createProducts = await productDAO.createMany(products).catch((error) => {
      logger.info(error);
      throw new AppError(commonErrors.databaseError, 500, "Internal Server Error");
    });
    return createProducts;
  },

  async detailProduct(id) {
    if (!id) {
      logger.info("id is not defined");
      throw new AppError(commonErrors.inputError, 400, "Bad request");
    }
    const product = await productDAO.findProductById(id).catch((error) => {
      logger.info(error);
      throw new AppError(commonErrors.databaseError, 500, "Internal Server Error");
    })
    return product;
  }
};

module.exports = productService;