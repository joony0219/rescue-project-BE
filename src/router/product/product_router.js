const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../dao/userdao/userDAO");
const pino = require('pino');

// passport를 활용한 jwt검증 예시, postman으로 확인해보세요!
router.get("/test", passport.authenticate("jwt", { session: false }), (req, res) => {
  const name = req.user.userName;
  console.log(name);
  res.send("User page");
});


// 임시 로그인, 토큰 지급
router.post("/signup", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // 유저 정보를 저장합니다
    const user = User.create({userName, password});

    // JWT 토큰을 생성합니다
    const token = jwt.sign({ userName: userName }, "f7cbc47fb2a659f6d859db2873c4c6a6f1a341a10a2fac06d176c5411e642339554cc767a628fe66f2ffab7dacb0fb0b14265e6dfdd353dd1417d32a8473e114");

    // JWT 토큰을 반환합니다
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
