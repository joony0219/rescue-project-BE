const jsonwebtoken = require("jsonwebtoken");
const secret =
  "f7cbc47fb2a659f6d859db2873c4c6a6f1a341a10a2fac06d176c5411e642339554cc767a628fe66f2ffab7dacb0fb0b14265e6dfdd353dd1417d32a8473e114";

// TODO = 비 로그인 유저의 random token value 생성 방법 구현

// 로그인시에 AccessToken 발급
const createAccessTokenWithLogin = (userName) => {
  const token = jsonwebtoken.sign(
    // payload
    {
      em: userName,
    },
    // 서명을 위한 시크릿값
    secret,
    { expiresIn: "2h" } // 토큰 유효 시간은 2시간
  );
  return token;
};

// return boolean
const isVerifiedToken = (token) => {
  try {
    const decodedToken = jsonwebtoken.verify(token, secret);
    const tokenExpired = new Date(decodedToken.exp * 1000) > new Date();

    if (token === decodedToken) {
      console.log("Token`s value is matched");
    } else {
      console.log("Token`s value is not matched");
      return false;
    }

    if (tokenExpired) {
      console.log("Token has expired");
    } else {
      console.log("Token is still valid");
      return false;
    }
    return true;
  } catch (err) {
    console.log("Token verification failed");
    return false;
  }
};

module.exports = { createAccessTokenWithLogin, isVerifiedToken };
