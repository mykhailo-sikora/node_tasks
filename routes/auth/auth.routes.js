const authRouter = require('express').Router();

const {authController} = require('../../controllers');
const {checkAccessToken} = require('../../middlewares');

authRouter.post('/', authController.loginUser);
authRouter.post('/logout', checkAccessToken, authController.logoutUser);
authRouter.post('/refresh', refreshAccessToken, authController.refreshUser); // HOME WORK

module.exports = authRouter;



