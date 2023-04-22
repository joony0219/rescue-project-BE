const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../../dao/userdao/mongoose/model/user_model");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

const cookieExtractor = function(req) {
  let token;
  if (req && req.cookies) {
      token = req.cookies['access_token'];
  }
  return token || undefined; // null 대신 undefined 반환
};

passport.use(
  'http-only-cookie',
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true // req를 콜백 함수에 전달하도록 추가
    },
    function (req, jwtPayload, done) // req 인수 추가
    {
      // JWT에서 추출한 정보를 이용하여 사용자 조회하기
      User.findOne({ userName: jwtPayload.userName })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
      });
    }
  )
);

module.exports = passport;