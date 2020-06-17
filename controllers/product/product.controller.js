const uuid = require('uuid').v1();
const fsx = require('fs-extra').promises;
const path = require('path');

const {productService, userService, emailService} = require('../../services');
const {
    errorHandler, responseCustomCode: {NOT_UPDATE, NOT_CREATED, NOT_DELETE}
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
            product.userId = req.userId;
            const [productPhoto] = req.photos;
            const isCreated = await productService.create(product);
            const photoDir = `products/${isCreated.id}/photos`;
            const fileExtension = path.extname(productPhoto.name);
            const photoName = `${uuid}${fileExtension}`;

            await fsx.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            await productPhoto.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            await productService.update(isCreated.id, {photo: `${photoDir}/${photoName}`});

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
    deletePhotoProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const isProductUpdate = await productService.update(productId, {photo: null});

            if (!isProductUpdate) return next(new errorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.code));

            res.sendStatus(NO_CONTENT);

            //other way
            // req.process.photo = null;
            // await req.product.save();
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
