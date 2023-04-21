const mongoose = require("mongoose");
const productSchema = require("../schema/product_schema");

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
