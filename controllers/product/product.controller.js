const {productService} = require('../../services');
const {errorHandler, errors} = require('../../errors');


module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await productService.getAll();

            res.json(products);
        } catch (e) {
            res.json(e)
        }
    },

    createProduct: async (req, res) => {
        try {
            const product = req.body;

            await productService.create(product);

            res.sendStatus('201');
        } catch (e) {
            res.json(e);
        }
    },

    getProduct: async (req, res) => {
        try {
            const {productId} = req.params;

            const product = await productService.getOne(productId);

            res.json(product)
        } catch (e) {
            res.json(e)
        }
    },

    deleteProduct: async (req, res, next) => {

        try {
            const {productId} = req.params;

            const isDeleted = await productService.delete(productId);

            if (isDeleted) {
                res.sendStatus(204)
            } else {
                return next(new errorHandler('the product has not been deleted', 400, 4001))
            }

        } catch (e) {
            res.json(e.message)
        }

    },

    updateProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const product = req.body;

            const [isUpdate] = await productService.update(productId, product);

            if (isUpdate) {
                res.sendStatus(200)
            } else {
                return next(new errorHandler('the product has not been updated', 400, 4001))
            }

        } catch (e) {
            res.json(e.message)
        }
    }
};
