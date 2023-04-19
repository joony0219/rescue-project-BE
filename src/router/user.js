const express = require("express");
const router = express.Router();
const hashPassword = require("../util/hash");
const { createAccessTokenWithLogin } = require("../util/auth/jwt_utils");

const User = require("../dao/userdao/mongoose/model/user_model");

router.post("/auth/signup", async (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = hashPassword(password);
  const newUser = await User.create({
    userName,
    password: hashedPassword,
  });
  res.send(newUser);
});

router.post("/auth/login", async (req, res) => {
  const { userName, password } = req.body;
  const loginUser = await User.find({ userName });
  if (!loginUser) {
    res.send({
      error: true,
      msg: "User does not exist",
    });
  }
  if (loginUser.password !== hashPassword(password)) {
    return res.send({
      error: true,
      msg: "Invalid password",
    });
  }
  const token = createAccessTokenWithLogin(loginUser.userName);
  res.cookie("token", token);
  res.send({ loginUser, token });
});

module.exports = router;
