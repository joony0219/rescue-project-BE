const express = require('express');
const { signUp, login, test } = require('./controller/userController');
const userRouter = express.Router();

//회원가입
userRouter.post('/signup', signUp);

//로그인
userRouter.post('/login', login);

userRouter.get('/test', test);

module.exports = userRouter;
