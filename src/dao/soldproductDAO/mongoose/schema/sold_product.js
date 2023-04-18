const mongoose = require("mongoose");
const {
  connectToMongoDB,
} = require("../../../../util/connection/mongo_connect");

connectToMongoDB();

const soldProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    category: {
      type: String,
      enum: ["DRINKWARE", "TABLEWARE", "KICHENWARE", "INTERIOR", "ALL"],
      default: "ALL",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: () => `가격은 음수일 수 없습니다.`,
      },
      required: true,
    },
    soldCount: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: () => `판매수량은 음수일 수 없습니다.`,
      },
      required: true,
    },
    color: {
      type: String,
    },
  },

  {
    timestamps: true,
    collection: "SoldProduct", // 주의 collection 이름을 명시하지 않으면 아래 mongoose.model의 첫 번째 인자로 전달된 값을 복수형으로 해서 사용한다.
  }
);

module.exports = soldProduct;
