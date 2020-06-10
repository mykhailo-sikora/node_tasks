const jwt = require('jsonwebtoken');
const ErrorHandler = require('../../errors/ErrorHandler');


const {errors} = require('../../errors');
const {authService} = require('../../services');
const {TokenEnums: {JWT_SECRET, JWT_REFRESH_SECRET}, responseStatusCodes} = require('../../constants');


module.exports = async (req, res, next) => {

    const token = req.get('Authorization');

    if (!token) {
        return next(new ErrorHandler(errors.NOT_VALID_TOKEN.message, responseStatusCodes.BAD_REQUEST, errors.NOT_VALID_TOKEN.code))
    }

    jwt.verify(token, JWT_SECRET, err => {
        if (err) {
            return next(new ErrorHandler(errors.NOT_VALID_TOKEN.message, responseStatusCodes.BAD_REQUEST, errors.NOT_VALID_TOKEN.code));
        }
    });

    const tokensFromDataBase = await authService.getTokenByParams({access_token: token});

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
