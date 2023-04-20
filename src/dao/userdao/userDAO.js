const { User } = require("./mongoose/model/index");

const UserDAO = {
  async create({ userName, password }) {
    const user = new User({ userName, password });
    await user.save();
    return user.toObject();
  },

  async findByUserName(userName) {
    const user = await User.findOne({ userName });
    return user && user.toObject();
  }
};

module.exports = UserDAO;
