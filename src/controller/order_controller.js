const orderService = require("../service/order_service.js");
const buildResponse = require("../util/response/response_builder.js");

const orderController = {
  async postOrder(req, res, next) {
    const products = req.body;
    const userName = req.user.userName;
    try {
      await orderService.createOrders(userName, products);
      return res.status(200).json(buildResponse(null, null));
    } catch (error) {
      next(error);
    }
  },

  
}

module.exports = orderController;