const {productService} = require('../../services');
const {hashPassword, checkHashPassword} = require('../../helpers');
const {errorHandler} = require('../../errors');


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
            const {id} = req.params;

            const product = await productService.getOne(id);

            res.json(product)
        } catch (e) {
            res.json(e)
        }
    },

    deleteProduct: async (req, res, next) => {

        try {
            const {id} = req.params;

            const isDeleted = await productService.delete(id);

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
            const {id} = req.params;
            const product = req.body;

            const [isUpdate] = await productService.update(id, product);

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
