const authRouter = require('express').Router();

const {authController} = require('../../controllers');
const {checkAccessToken, checkRefreshToken} = require('../../middlewares');

authRouter.post('/', authController.loginUser);
authRouter.post('/logout', checkAccessToken, authController.logoutUser);
authRouter.post('/refresh', checkRefreshToken, authController.refreshUser);

module.exports = authRouter;



