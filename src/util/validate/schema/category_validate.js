const Joi = require('joi');
const pino = require('pino')();
const { PRODUCT_CATEGORY } = require('../../../commonenum/product_category');
const AppError = require("../../../misc/AppError.js");
const commonErrors = require("../../../misc/commonErrors.js");

const CategorySchema = Joi.string().valid(...Object.values(PRODUCT_CATEGORY));

// req type = string
const validateCategory = (CategorySchema) => (req, res, next) => {
    const category = req.query.category;
    const result = CategorySchema.validate(category);

    if (result.error) {
     pino.error(result.error.details);
     return next(new AppError(
       commonErrors.inputError,
       400,
       "Bad Request"
     ));
   }

  next();
};

module.exports = { validateCategory, CategorySchema };