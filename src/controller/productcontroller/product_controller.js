const productService = require("../../service/productservice/product_service.js");
const buildResponse = require("../../util/response/response_builder.js");

const productController = {
    async getProducts(req, res, next) {
        const category = req.query.category; 
        const offset = parseInt(req.query.offset ? req.query.offset : 0);
        const limit = parseInt(req.query.limit ? req.query.limit : 100);
        try {
          const products = await productService.getProduct(category, offset, limit);
          return res.status(200).json(buildResponse(null, products));
        } catch (error) {
          next(error);
        }
    },
};
  
module.exports = productController;