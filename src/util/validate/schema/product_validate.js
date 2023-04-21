const Joi = require('joi');
const pino = require('pino')();
const { PRODUCT_CATEGORY } = require('../../../commonenum/product_category');

// req type = string
const validateProduct = (category) => {
  const schema = Joi.string().valid(...Object.values(PRODUCT_CATEGORY));
  const result = schema.validate(category);

  if (result.error) {
    pino.error(result.error.details);
    return Error('Invalid product category');
  } else {
    return result;
  }
};

module.exports = validateProduct;