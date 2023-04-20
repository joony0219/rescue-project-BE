const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../dao/userdao/userDAO");
const pino = require('pino')();
const { createAccessTokenWithLogin } = require('../../util/auth/jwt_utils.js');
const { signupSchema, signupValidation } = require('../../util/validate/schema/signup_validate.js');
const userService = require("../../service/userservice/user_service.js");
const { loginSchema, loginValidation } = require('../../util/validate/schema/login_validation.js');

// 회원가입 signupValidation을 미리 수행
router.post("/signup", signupValidation(signupSchema), async (req, res) => {
  const { userName, password } = req.body;
  try {
    await userService.createUser(userName, password);
    return res.status(200).json("OK");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;