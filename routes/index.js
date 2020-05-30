const router = require('express').Router(); // наші роути, які відповідатимуть за наші продукти

const productRouter = require('./product/product.router');
const {notFoundController} = require('../controllers');

router.use('/product', productRouter);
router.use('/', notFoundController);

module.exports = router;
