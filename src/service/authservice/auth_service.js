const userDAO = require('../../dao/userdao/userDAO.js');
const { hashPassword, comparePassword } = require('../../util/encrypt/hash_password.js');
const pino = require('pino')();
const AppError = require('../../misc/AppError.js');
const commonErrors = require('../../misc/commonErrors');

const authService = {
    async createUser(userName, password, roletype, phoneNumber, mail, address ) {
        const existingUser = await userDAO.findByUserName(userName).catch(() => { return new AppError("findByUserName failed", 500, "Internal Server Error")});

        if (existingUser) {
          throw new AppError("User registration failed: User already exists", 409, "Internal Server Error");
        }

        const hashed = await hashPassword(password);
        const newUser = await userDAO.create({ userName, password: hashed, roletype, phoneNumber, mail, address }).catch(() => { return new AppError("user create failed", 500, "Internal Server Error")});
        return newUser;
    },

    async authenticateUser(userName, password) {
        const findUser = await userDAO.findByUserName(userName).catch(() => { return new AppError("findByUserName failed", 500, "Internal Server Error") });

        if (!findUser) {
          throw new AppError("User not found", 401, "Unauthorized");
        }

        const match = await comparePassword(password, findUser.password);
        if (!match) {
          throw new AppError("Incorrect login information", 401, "Unauthorized");
        }

        return true;
    },
}
  
module.exports = authService;