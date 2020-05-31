const {productService} = require('../../services');

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

    deleteProduct: async (req, res) => {

        try {
            const {id} = req.params;

            const idDeleted = await productService.delete(id);

            idDeleted ? res.sendStatus(204) : res.json({deleted: false});

        } catch (e) {
            res.json(e)
        }

    },

    updateProduct: async (req, res) => {
        try {
            const {id} = req.params;
            const product = req.body;

            const [idUpdate] = await productService.update(id, product);

            idUpdate ? res.sendStatus(200) : res.json({updated: false});

        } catch (e) {
            res.json(e)
        }
    }
};
