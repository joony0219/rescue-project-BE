const mongoose = require("mongoose");
const soldProductSchema = require("../schema/soldproduct_schema");

const SoldProduct = mongoose.model("soldProduct", soldProductSchema);

module.exports = { SoldProduct };
