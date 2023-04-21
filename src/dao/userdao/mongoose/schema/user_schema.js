const mongoose = require("mongoose");
const {
  connectToMongoDB,
} = require("../../../../util/connection/mongo_connect");

connectToMongoDB();

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => v.length >= 3 && v.length <= 15,
      },
      message: (props) => `${props.value}은(는) 3~15 글자여야 합니다.`,
    },
    password: {
      type: String,
      required: true,
    },
    roletype: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      validate: {
        validator: (v) => /^[0-9]{3,15}$/.test(v),
        message: (props) => `${props.value}은(는) 올바른 전화번호 형식이 아닙니다.`,
      },
    },
    mail: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => /^.{1,50}$/.test(v),
        message: (props) => `${props.value}은(는) 1~50 글자여야 합니다.`,
      },
    },
    address: {
      type: String,
      validate: {
        validator: (v) => /^.{1,200}$/.test(v),
        message: (props) => `${props.value}은(는) 1~200 글자여야 합니다.`,
      },
    },
  },

  {
    timestamps: true,
    collection: "User", // 주의 collection 이름을 명시하지 않으면 아래 mongoose.model의 첫 번째 인자로 전달된 값을 복수형으로 해서 사용한다.
  }
);

module.exports = userSchema;
