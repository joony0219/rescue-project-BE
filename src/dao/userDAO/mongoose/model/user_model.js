const mongoose = require("mongoose");
const userSchema = require("../schema/product");

const user = mongoose.model("User", userSchema);

module.exports = user;
