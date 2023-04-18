const mongoose = require("mongoose");
const userSchema = require("../schema/user_schema");

const User = mongoose.model("User", userSchema);

module.exports = { User };
