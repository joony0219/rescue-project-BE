const { User } = require("./mongoose/model/index");

const UserDAO = {
  async create({ userName, password, roletype, phoneNumber, mail, address  }) {
    const user = new User({ userName, password, roletype, phoneNumber, mail, address });
    await user.save();
    return user.toObject();
  },

  async findByUserName(userName) {
    const user = await User.findOne({ userName });
    return user && user.toObject();
  }
};

module.exports = UserDAO;
