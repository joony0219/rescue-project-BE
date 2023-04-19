const express = require('express');
const { signUp, login } = require('./controller/userController');
const userRouter = express.Router();

//회원가입
userRouter.post('/signup', signUp);

//로그인
userRouter.post('/login', login);

module.exports = userRouter;
