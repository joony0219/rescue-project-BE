const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../../dao/userdao/mongoose/model/user_model");


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
      secretOrKey:
        "f7cbc47fb2a659f6d859db2873c4c6a6f1a341a10a2fac06d176c5411e642339554cc767a628fe66f2ffab7dacb0fb0b14265e6dfdd353dd1417d32a8473e114",
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