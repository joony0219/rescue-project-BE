const bcrypt = require("bcrypt");

const hashedPassword = (password) => bcrypt.hash(password, 10);

module.exports = hashedPassword;
