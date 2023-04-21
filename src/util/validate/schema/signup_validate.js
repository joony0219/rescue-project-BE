const Joi = require('joi');

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
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            error: error.details[0].message
        });
      }
    next();
  }
}

module.exports = { signupSchema, validateSignup };