const authService = require("../../service/authservice/auth_service.js");
const { createAccessTokenWithLogin } = require('../../util/auth/jwt_utils.js');
const buildResponse = require("../../util/response/response_builder.js");

const authController = {
    async postSignup(req, res, next) {
      const { userName, password } = req.body;
      try {
        await authService.createUser(userName, password);
        return res.status(200).json(buildResponse(null, null));
      } catch (error) {
        return res.status(409).send(error.message);
      }
    },
    
    async getAuthenticate(req, res, next) {
      return res.status(200).json(buildResponse(null, null));
    },

    async postLogin(req, res, next) {
      const { userName, password } = req.body;
      const isAuthenticate = await authService.authenticateUser(userName, password);
        
        if (isAuthenticate) {
          const accessToken = await createAccessTokenWithLogin(userName);
          res.cookie('access_token', accessToken, { httpOnly: true });
          return res.status(200).json(buildResponse(null, null));
        }

        if (!isAuthenticate) {
          return res.status(401).json(buildResponse("Unauthorized", null));
        }

        next(error);
    },

    async getLogout(req, res, next) {
      res.clearCookie("access_token");
      return res.status(200).json(buildResponse(null, null))
    }
};
  
module.exports = authController;
  