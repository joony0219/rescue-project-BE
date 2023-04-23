const userDAO = require('../dao/userdao/userDAO.js');
const { hashPassword, comparePassword } = require('../util/encrypt/hash_password.js');
const AppError = require('../misc/AppError.js');
const commonErrors = require('../misc/commonErrors');
const logger = require("../util/logger/pino.js");

const authService = {
  async createUser(userName, password, roleType, phoneNumber, mail, address) {
    const existingUser = await userDAO.findByUserName(userName).catch((error) => {
      logger.info(error);
      throw new AppError("findByUserName failed", 500, "Internal Server Error")} );
    if (existingUser) {
      logger.info("User registration failed: User already exists");
      throw new AppError("User registration failed: User already exists", 409, "Internal Server Error");
    }
    const hashed = await hashPassword(password);
    const newUser = await userDAO.create({ userName, password: hashed, roleType, phoneNumber, mail, address }).catch((error) => { 
      logger.info(error);
      throw new AppError("user create failed", 500, "Internal Server Error")});
    return newUser;
  },

  async authenticateUser(userName, password) {
    const findUser = await userDAO.findByUserName(userName).catch((error) => {
      logger.info(error); 
      throw new AppError("findByUserName failed", 500, "Internal Server Error") });
    if (!findUser) {
      logger.info("user is not find");
      throw new AppError("User not found", 401, "Unauthorized");
    }
    const match = await comparePassword(password, findUser.password);
    if (!match) {
      logger.info("password not matched");
      throw new AppError("Incorrect login information", 401, "Unauthorized");
    }
    return;
  },
}
  
module.exports = authService;