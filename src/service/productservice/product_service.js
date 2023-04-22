const productDAO = require('../../dao/productdao/productDAO');
const { PRODUCT_CATEGORY } = require('../../commonenum/product_category');
const AppError = require('../../misc/AppError');
const commonErrors = require('../../misc/commonErrors.js');
const pino = require('pino')();

const productService = {
    async getProduct(category, offset, limit) {
        let products;
        try {
          switch (category) {
            case PRODUCT_CATEGORY.TEA:
              return products = await productDAO.findProductsByCategory('TEA', offset, limit);
            case PRODUCT_CATEGORY.MUG:
              return products = await productDAO.findProductsByCategory('MUG', offset, limit);
            case PRODUCT_CATEGORY.TUMBLER:
              return products = await productDAO.findProductsByCategory('TUMBLER', offset, limit);
            default:
              throw new AppError(commonErrors.resourceNotFoundError, 404, "Not found");
        }
      } catch (error) {
         pino.log(error);
         return new AppError("findProductsByCategory failed", 500, "Internal Server Error");
    }
  },
};

module.exports = productService;