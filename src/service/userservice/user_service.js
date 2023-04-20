const userDAO = require('../../dao/userdao/userDAO.js');
const { hashPassword, comparePassword } = require('../../util/encrypt/hash_password.js');
const pino = require('pino')();

const userService = {
    async createUser(userName, password) {
      try {
        const existingUser = await userDAO.findByUserName(userName);
        if (existingUser) {
          throw new Error("User already exists");
        }
        const hashed = await hashPassword(password);
        const newUser = await userDAO.create({ userName, password: hashed });
        return newUser;
      } catch (error) {
        // 예외 처리
        pino.error(error);
        throw new Error('Failed to create user.');
      }
    },

    async authenticateUser(userName, password) {
      try {
        const findUser = await userDAO.findByUserName(userName);
        if (!findUser) {
          throw new Error("User not found");
        }
        const match = await comparePassword(password, findUser.password);
        if (!match) {
          throw new Error("Incorrect login information");
        }
        return true;
      } catch (error) {
        pino.error(error);
        return false;
    }
  }
}
  
module.exports = userService;