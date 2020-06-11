const {productService, userService, emailService} = require('../../services');
const {
    errorHandler,
    responseCustomCode: {NOT_UPDATE, NOT_CREATED, NOT_DELETE}
} = require('../../errors');
const {
    responseStatusCodes: {NOT_FOUND_CODE, OK, CREATED, NO_CONTENT},
    EmailActionEnum: {USER_UPDATE_PRODUCT, USER_DELETE_PRODUCT, USER_ADD_PRODUCT,}
} = require('../../constants');


module.exports = {
    getProducts: async (req, res) => {
        try {
            const products = await productService.getAll();

            res.json(products);
        } catch (e) {
            res.json(e)
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const product = req.body;
            const isCreated = await productService.create(product);

            if (!isCreated) return next(new errorHandler(NOT_CREATED.message, NOT_FOUND_CODE, NOT_CREATED.code));

            const user = await userService.getUserById(req.userId);

            await emailService.sendMail(user.email, USER_ADD_PRODUCT, {user, product});

            res.sendStatus(CREATED);
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
            const product = await productService.getOne(productId);
            const user = await userService.getUserById(req.userId);
            const isDeleted = await productService.delete(productId);

            if (!isDeleted) return next(new errorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.code));

            await emailService.sendMail(user.email, USER_DELETE_PRODUCT, {user, product});

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }

    },

    updateProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const product = req.body;
            const user = await userService.getUserById(req.userId);
            const [isUpdate] = await productService.update(productId, product);

            if (!isUpdate) return next(new errorHandler(NOT_UPDATE.message, NOT_FOUND_CODE, NOT_UPDATE.code));

            await emailService.sendMail(user.email, USER_UPDATE_PRODUCT, {user, product});

            res.sendStatus(OK);

        } catch (e) {
            next(e);
        }
    }
};
