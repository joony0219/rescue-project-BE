const mongoose = require("mongoose");
const solProductSchema = require("../schema/sold_product");

const soldProduct = mongoose.model("soldProduct", solProductSchema);

module.exports = soldProduct;
