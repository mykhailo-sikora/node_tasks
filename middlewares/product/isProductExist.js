const {productService} = require('../../services');
const {errorHandler} = require('../../errors');

module.exports = async (req, res, next) => {

    const {productId} = req.params;

    if (isNaN(productId) || +productId < 0) next(new errorHandler('Product is not valid', 400, 4001));

    const product = await productService.getOne(productId);

    if (!product) {
        return next(new errorHandler('Product not found', 404, 4041));
    }
    req.product = product;

    next();

};
