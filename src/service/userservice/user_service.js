const userDAO = require('../../dao/userdao/userDAO.js');
const hashedPassword = require('../../util/encrypt/hash_password.js');
const pino = require('pino')();

const userService = {
    async createUser(userName, password) {
    try {
        const existingUser = await userDAO.findByUserName(userName);
        if (existingUser) {
            return new Error("User already exists");
        }
        const hashed = await hashedPassword(password);
        const newUser = await userDAO.create({ userName, password: hashed });
        return newUser;
      } catch (error) {
        // 예외 처리
        pino.error(error);
        throw new Error('Failed to create user.');
      }
    },
};
  
module.exports = userService;