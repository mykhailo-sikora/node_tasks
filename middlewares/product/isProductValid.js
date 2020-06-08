const Joi = require('joi');
const {errorHandler} = require('../../errors');

const {errors} = require('../../errors');
const {responseStatusCodes} = require('../../constants');

const {productValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {

    const product = req.body;

    const {error} = Joi.validate(product, productValidJoiSchema);

    if (error) return next(new errorHandler(error.details[0].message, responseStatusCodes.BAD_REQUEST, errors.NOT_VALID.code));

    next();

};
