const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  mongoose.connection.on("connecting", () => {
    console.log("Mongoose가 MongoDB 서버에 연결중입니다!");
  });
  mongoose.connection.on("connected", () => {
    console.log("Mongoose가 MongoDB에 정상적으로 연결되었습니다.");
  });
  mongoose.connection.on("disconnecting", () => {
    console.log("Mongoose가 MongoDB와의 연결을 끊고 있습니다!");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose가 MongoDB와의 연결을 정상적으로 끊었습니다.");
  });
  mongoose.connection.on("error", (error) => {
    console.log(`Mongoose에서 에러가 발생하였습니다: ${error}`);
  });

  try {
    await mongoose.connect(
      "mongodb+srv://bbde1861:bSrEMDvfbCitwhtU@padonan.whfx4wy.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        minPoolSize: 4, // min pool size 설정
        maxPoolSize: 100, // max pool size 설정
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  mongoose,
  connectToMongoDB,
};
