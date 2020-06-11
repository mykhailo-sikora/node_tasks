const {productService} = require('../../services');
const {errorHandler, responseCustomCode: {NOT_FOUND, NOT_VALID}} = require('../../errors');
const {responseStatusCodes: {NOT_FOUND_CODE, BAD_REQUEST}} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const {productId} = req.params;

        if (isNaN(productId) && +productId < 0) next(new errorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.code));

        const product = await productService.getOne(productId);

        if (!product) return next(new errorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.code));

        req.product = product;

        next();
    } catch (e) {
        next(e)
    }
};
