const { User } = require("./mongoose/model/index");
const logger = require("../../util/logger/pino.js");

const UserDAO = {
  async create({ userName, password, roleType, phoneNumber, mail, address }) {
    const user = new User({ userName, password, roleType, phoneNumber, mail, address });
    const saveUser = await user.save();
    return user.toObject();
  },

  async findByUserName(userName) {
    const user = await User.findOne({ userName }).lean();
    return user;
  }
};

module.exports = UserDAO;
