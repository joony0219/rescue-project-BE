const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../../dao/userdao/mongoose/model/user_model");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        "f7cbc47fb2a659f6d859db2873c4c6a6f1a341a10a2fac06d176c5411e642339554cc767a628fe66f2ffab7dacb0fb0b14265e6dfdd353dd1417d32a8473e114",
    },
    function (jwtPayload, done) {
      // JWT에서 추출한 정보를 이용하여 사용자 조회하기
      User.findById(jwtPayload.id, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
