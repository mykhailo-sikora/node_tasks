const productRouter = require('express').Router();

const {isProductExist, isProductValid} = require('../../middlewares');

const {productController} = require('../../controllers');


productRouter.get('/', productController.getProducts);
productRouter.post('/', isProductValid, productController.createProduct);

productRouter.use('/:productId', isProductExist);

productRouter.get('/:productId', productController.getProduct);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

module.exports = productRouter;



