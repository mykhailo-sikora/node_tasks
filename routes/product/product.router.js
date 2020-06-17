const productRouter = require('express').Router();

const {isProductExist, isProductValid, checkFiles, checkUserPhotoCount, checkAccessToken} = require('../../middlewares');
const {productController} = require('../../controllers');

productRouter.get('/', productController.getProducts);
productRouter.post('/', isProductValid, checkAccessToken, checkFiles, checkUserPhotoCount, productController.createProduct);
productRouter.use('/:productId', checkAccessToken, isProductExist);
productRouter.get('/:productId', productController.getProduct);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);
productRouter.delete('/:productId/photo', productController.deletePhotoProduct);

module.exports = productRouter;



