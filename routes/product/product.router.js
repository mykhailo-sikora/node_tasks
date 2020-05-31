const productRouter = require('express').Router();

const {isProductExist, isProductValid} = require('../../middlewares');

const {productController} = require('../../controllers');


productRouter.get('/', productController.getProducts);
productRouter.post('/', isProductValid, productController.createProduct);

productRouter.put('/:id', isProductExist);

productRouter.get('/:id', productController.getProduct);
productRouter.put('/:id', isProductValid, productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;



