const mongoose = require("mongoose");

const userSchema = require("../../mongoose/schema/user_schema");

const User = mongoose.model("User", userSchema);

module.exports = { User };
