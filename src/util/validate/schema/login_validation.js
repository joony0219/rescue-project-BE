const Joi = require('joi');

// userName은 3~15글자 제한, password는 5~30 제한
const loginSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
});

const validateLogin = (loginSchema) => {
    return (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            error: error.details[0].message
        });
      }
    next();
  }
}

module.exports = { loginSchema, validateLogin };