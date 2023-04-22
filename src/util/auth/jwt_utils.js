const jwt = require("jsonwebtoken");
const pino = require('pino')();
const AppError = require('../../misc/AppError.js');
const commonErrors = require('../../misc/commonErrors.js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// 로그인시에 AccessToken 발급
const createAccessTokenWithLogin = async (userName) => {
  const token = await new Promise((resolve, reject) => {
    jwt.sign({ userName },  process.env.JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
      if (err) reject(new AppError(commonErrors.authenticationError, 401, "Unauthorized"));
      resolve(token);
    });
  })
  return token;
};

// return boolean
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization.split(' ')[1];
//   try {
//     const decodeToken = jwt.verify(token, secret);
//     const notExpireToken = new Date(decodeToken.exp * 1000) > new Date();

//     if (token ==! decodeToken && notExpireToken) {
//       throw new AppError(commonErrors.authenticationError, 401, "Unauthorized");
//     }

//     next();

//   } catch(err) {
//     pino.error(err);
//     next(err);
//   };
// }

module.exports = { createAccessTokenWithLogin };
