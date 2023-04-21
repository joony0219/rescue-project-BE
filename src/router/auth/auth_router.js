const express = require("express");
const router = express.Router();
const User = require("../../dao/userdao/userDAO");
const pino = require('pino')();
const { createAccessTokenWithLogin, verifyToken } = require('../../util/auth/jwt_utils.js');
const { signupSchema, validateSignup } = require('../../util/validate/schema/signup_validate.js');
const userService = require("../../service/userservice/user_service.js");
const { loginSchema, validateLogin } = require('../../util/validate/schema/login_validation.js');
const AppError = require('../../misc/AppError.js');

//signupValidation을 미리 수행
router.post("/signup", validateSignup(signupSchema), async (req, res) => {
  const { userName, password } = req.body;
  try {
    await userService.createUser(userName, password);
    return res.status(200).json("OK");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// 로그인 여부를 파악 (jwt 검수)
router.get("/signed-in", verifyToken, async (req, res) => {
  return res.status(200).json("OK");
})

router.post("/login", validateLogin(loginSchema), async (req, res) => {
  const { userName, password } = req.body;
  try {
    const isAuthenticate = await userService.authenticateUser(userName, password);
    if (isAuthenticate === true) {
      const accessToken = createAccessTokenWithLogin(userName);
      res.cookie('access_token', accessToken, { httpOnly: true });
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;