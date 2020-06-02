const Joi = require('joi');
const {errorHandler} = require('../../errors');

const {productValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, productValidJoiSchema);

        if (error) return next(new errorHandler('The product has not been validated, because one of us is a teapot', 418, 40018));
        next();
    } catch (e) {
        res.json({error: e.message})
    }
};
