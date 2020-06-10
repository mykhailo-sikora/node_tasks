const Joi = require('joi');
const {errorHandler} = require('../../errors');

const {errors:{NOT_VALID}} = require('../../errors');
const {responseStatusCodes:{BAD_REQUEST}} = require('../../constants');

const {productValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {

    const product = req.body;

    const {error} = Joi.validate(product, productValidJoiSchema);

    if (error) return next(new errorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.code));

    next();

};
