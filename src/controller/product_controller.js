const productService = require("../service/productservice/product_service.js");

const productController = {
    async getProducts(req, res, next) {
        const category = req.query.category; 
        const offset = parseInt(req.query.offset ? req.query.offset : 0);
        const limit = parseInt(req.query.limit ? req.query.limit : 100);
        try {
          const productArray = await productService.getProduct(category, offset, limit);
          if (!productArray) {
            return res.status(404).json({ error: "Product_document not found" });
          }
          return res.status(200).json(productArray);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = productController;