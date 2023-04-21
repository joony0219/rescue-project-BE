const jwt = require("jsonwebtoken");
const pino = require('pino')();
const secret =
  "f7cbc47fb2a659f6d859db2873c4c6a6f1a341a10a2fac06d176c5411e642339554cc767a628fe66f2ffab7dacb0fb0b14265e6dfdd353dd1417d32a8473e114";

// TODO = 비 로그인 유저의 random token value 생성 방법 구현

// 로그인시에 AccessToken 발급
const createAccessTokenWithLogin = (userName) => {
  const token = jwt.sign(
    // payload
    {
      userName,
    },
    // 서명을 위한 시크릿값
    secret,
    { expiresIn: "2h" } // 토큰 유효 시간은 2시간
  );
  return token;
};

// return boolean
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodeToken = jwt.verify(token, secret);
    const notExpireToken = new Date(decodeToken.exp * 1000) > new Date();

    if (token ==! decodeToken && notExpireToken) {
      throw new Error('Invalid token');
    }

    next();

  } catch (err) {
    pino.error(err);
    res.status(401).send({ error: 'Invalid token' });
  };
}

module.exports = { createAccessTokenWithLogin, verifyToken };
