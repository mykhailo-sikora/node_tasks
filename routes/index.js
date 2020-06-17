const router = require('express').Router();

const productRouter = require('./product/product.router');
const userRouter = require('./users/user.router');
const authRouter = require('./auth/auth.routes');
const {notFoundController} = require('../controllers');
const {logger} = require('../logs');

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/', notFoundController);

router.use('*', (err, req, res, next) => {
    logger.error({
        method: req.method,
        url: req.path,
        data: req.body,
        time: new Date(),
        message: err.message
    });
    next(err)
});

router.use('*', (error, req, res, next) => {
    let message = error.message;

    if (error.parent) {
        message = error.parent.sqlMessage
    }
    res
        .status(error.status || 400)
        .json({
            message,
            code: error.custumCode
        })
});

module.exports = router;
