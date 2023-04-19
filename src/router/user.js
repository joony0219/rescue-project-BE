const express = require('express');

const { User } = require('../../src/dao/userdao/mongoose/model');
const hashedPassword = require('../../src/utils/hash');
const userRouter = express.Router();
const { generateToken } = require('../../src/utils/token');

//회원가입
userRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const newUser = await User.create({
    email,
    password: hashedPassword(password),
  });
  res.send(newUser);
});

//로그인
userRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).send({
      message: 'User Not Found',
    });
  }
  if (user.password !== hashedPassword(password)) {
    res.status(401).send({
      message: 'Invalid Password',
    });
  }
  const payload = {
    _id: user._id,
    email,
  };
  const token = generateToken(payload);
  res.send(token);
});

module.exports = userRouter;
