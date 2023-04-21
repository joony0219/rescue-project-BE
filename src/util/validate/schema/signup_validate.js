const Joi = require('joi');
const AppError = require("../../../misc/AppError.js");
const commonErrors = require("../../../misc/commonErrors.js");
const pino = require('pino')();

// userName은 3~15글자 제한, password는 5~30 제한
const signupSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
    roletype: Joi.string().pattern(new RegExp('^[a-zA-Z]{1,10}$')).required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
    mail: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_@.-]{1,50}$')).required(),
    address: Joi.string().pattern(new RegExp('^[a-zA-Z0-9가-힣\\s.,/#-]{1,200}$')).required(),
});

const validateSignup = (signupSchema) => {
  return (req, res, next) => {
    const result = signupSchema.validate(req.body);
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

module.exports = { signupSchema, validateSignup };