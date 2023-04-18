const mongoose = require("mongoose");
const solProductSchema = require("../schema/sold_product");

const SoldProduct = mongoose.model("soldProduct", solProductSchema);

module.exports = { SoldProduct };
