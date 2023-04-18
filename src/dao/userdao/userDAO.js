const { User } = require("./mongoose/model/index");

const UserDAO = {
  // document 객체를 생성하여 mongoDB에 저장하는 메소드
  async create({ userName, password }) {
    const user = new User({
      userName,
      password,
    });
    await user.save();
    // toObject를 이용해서 POJO로 변경.
    return user.toObject();
  },
  // TODO = 필요에 따라 새로운 DAO접근 메소드를 추가
};

module.exports = UserDAO;
