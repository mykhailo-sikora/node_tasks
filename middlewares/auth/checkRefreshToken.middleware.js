const jwt = require('jsonwebtoken');
const ErrorHandler = require('../../errors/ErrorHandler');
const {requestHeaders: {AUTHORIZATION}} = require('../../constants');


const {errors} = require('../../errors');
const {authService} = require('../../services');
const {wordsForTokenizer: {JWT_REFRESH_SECRET}, responseStatusCodes} = require('../../constants');


module.exports = async (req, res, next) => {

    const token = req.get(AUTHORIZATION);

    if (!token) {
        return next(new ErrorHandler('No token', 400, 4002))
    }

    jwt.verify(token, JWT_REFRESH_SECRET, err => {
        if (err) {
            return next(new ErrorHandler('Not valid token', 401, 4011));
        }
    });

    const tokensFromDataBase = await authService.getTokenByParams({refresh_token: token});

    if (!tokensFromDataBase) {
        return next(new ErrorHandler(
            errors.NOT_VALID_TOKEN.message,
            responseStatusCodes.UNAUTHORIZED,
            errors.NOT_VALID_TOKEN.code
        ));
    }

    req.userId = tokensFromDataBase.userId;

    next();

};
