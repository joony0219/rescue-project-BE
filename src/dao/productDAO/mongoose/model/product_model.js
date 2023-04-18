const mongoose = require("mongoose");
const productSchema = require("../schema/product");

const product = mongoose.model("Product", productSchema);

module.exports = product;
