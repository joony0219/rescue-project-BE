const Joi = require('joi');
const pino = require('pino')();
const { PRODUCT_CATEGORY } = require('../../../commonenum/product_category');

// req type = string
const validateCategory = () => (req, res, next) => {
  const category = req.query.category;
  const schema = Joi.string().valid(...Object.values(PRODUCT_CATEGORY));
  const result = schema.validate(category);

  if (result.error) {
    pino.error(result.error.details);
    return next(Error('Invalid product category'));
  }

  next();
};

module.exports = validateCategory;