const Joi = require('joi');
const pino = require('pino')();
const AppError = require("../../../misc/AppError.js");
const commonErrors = require("../../../misc/commonErrors.js");

// userName은 3~15글자 제한, password는 5~30 제한
const loginSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
});

const validateLogin = (loginSchema) => {
    return (req, res, next) => {
    const result = loginSchema.validate(req.body);

    if (result.error) {
      pino.error(result.error.details);
      return next(new AppError(
        commonErrors.inputError,
        400,
        "Bad Request"
      ));
    }

    next();
  }
}

module.exports = { loginSchema, validateLogin };