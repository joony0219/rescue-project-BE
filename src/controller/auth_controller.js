const authService = require("../service/authservice/auth_service.js");
const { createAccessTokenWithLogin } = require('../util/auth/jwt_utils.js');

const authController = {
    async postSignup(req, res, next) {
      const { userName, password } = req.body;
      try {
        await authService.createUser(userName, password);
        return res.status(200).json("OK");
      } catch (error) {
        return res.status(400).send(error.message);
      }    
    },
    
    async getAuthenticate(req, res, next) {
      return res.status(200).json("OK");
    },

    async postLogin(req, res, next) {
      const { userName, password } = req.body;
      try {
        const isAuthenticate = await authService.authenticateUser(userName, password);
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
    }
};
  
module.exports = authController;
  