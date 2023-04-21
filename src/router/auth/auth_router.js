const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../../controller/auth_controller.js");
const { signupSchema, validateSignup } = require('../../util/validate/schema/signup_validate.js');
const { loginSchema, validateLogin } = require('../../util/validate/schema/login_validation.js');

// /auth 

router.post("/signup", 
  validateSignup(signupSchema), 
  authController.postSignup
);

// 로그인 여부를 파악 (jwt 검수)
router.get("/signed-in",
  passport.authenticate('http-only-cookie', { session: false, failWithError: true }), 
  authController.getAuthenticate
);

router.post("/login",
  validateLogin(loginSchema), 
  authController.postLogin
);

module.exports = router;