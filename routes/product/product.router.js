const productRouter = require('express').Router();

const {isProductExist, isProductValid, checkAccessToken} = require('../../middlewares');
const {productController} = require('../../controllers');

productRouter.get('/', productController.getProducts);
productRouter.post('/', isProductValid, checkAccessToken, productController.createProduct);
productRouter.use('/:productId', checkAccessToken, isProductExist);
productRouter.get('/:productId', productController.getProduct);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

module.exports = productRouter;



