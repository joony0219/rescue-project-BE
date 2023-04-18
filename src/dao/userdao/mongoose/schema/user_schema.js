const mongoose = require("mongoose");
const {
  connectToMongoDB,
} = require("../../../../util/connection/mongo_connect");

connectToMongoDB();

// 아이디는 1 ~ 20개의 제한 갯수를 가진다. validate한다.
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      validate: {
        validator: (v) => v.length >= 1 && v.length <= 20,
      },
      message: (props) => `${props.value}은(는) 1~20 글자여야 합니다.`,
    },
    password: {
      type: String,
      required: true,
    },
    roletype: {
      type: String,
    },
  },

  {
    timestamps: true,
    collection: "User", // 주의 collection 이름을 명시하지 않으면 아래 mongoose.model의 첫 번째 인자로 전달된 값을 복수형으로 해서 사용한다.
  }
);

module.exports = userSchema;
