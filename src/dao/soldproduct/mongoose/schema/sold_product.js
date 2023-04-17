const mongoose = require("mongoose");

await mongoose.connect(
  `mongodb+srv://bbde1861:bSrEMDvfbCitwhtU@padonan.whfx4wy.mongodb.net/test`
);

const soldProductSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema" },
    category: String,
    Name: String,
    price: Number,
    soldCount: Number,
    color: String,
  },

  {
    timestamps: true,
    collection: "soldProduct", // 주의 collection 이름을 명시하지 않으면 아래 mongoose.model의 첫 번째 인자로 전달된 값을 복수형으로 해서 사용한다.
  }
);

module.exports = soldProduct;
