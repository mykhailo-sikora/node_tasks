const Joi = require('joi');
const {errorHandler} = require('../../errors');

const {productValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {

    const product = req.body;

    const {error} = Joi.validate(product, productValidJoiSchema);

    if (error) return next(new errorHandler(error.details[0].message, 400, 4001));

    next();

};
