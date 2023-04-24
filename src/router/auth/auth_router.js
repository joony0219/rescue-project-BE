const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../../controller/auth_controller.js");
const { signupSchema, validateSignup } = require('../../middleware/validate/schema/signup_validate.js');
const { loginSchema, validateLogin } = require('../../middleware/validate/schema/login_validation.js');

// URL = /auth 

router.post("/signup", 
  validateSignup, 
  authController.postSignup
);

// 로그인 여부를 파악 (jwt 검수)
router.get("/signed-in",
  passport.authenticate('http-only-cookie', { session: false, failWithError: true }), 
  authController.getAuthenticateStatus
);

router.post("/login",
  validateLogin, 
  authController.postLogin
);

// passport를 통해 401이면 이미 로그아웃 상태이다
router.post("/logout",
  passport.authenticate('http-only-cookie', { session: false, failWithError: true }),
  authController.postLogout
);

module.exports = router;