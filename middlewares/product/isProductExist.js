const {productService} = require('../../services');
const {errorHandler} = require('../../errors');

const {errors} = require('../../errors');
const {responseStatusCodes} = require('../../constants');

module.exports = async (req, res, next) => {

    const {productId} = req.params;

    if (isNaN(productId) && +productId < 0) next(new errorHandler(errors.NOT_VALID.message, responseStatusCodes.BAD_REQUEST, errors.NOT_VALID.code));

    const product = await productService.getOne(productId);

    if (!product) {
        return next(new errorHandler(errors.NOT_FOUND.message, responseStatusCodes.NOT_FOUND, errors.NOT_FOUND.code));
    }
    req.product = product;

    next();

};
