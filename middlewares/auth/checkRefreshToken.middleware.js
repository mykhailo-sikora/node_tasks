const jwt = require('jsonwebtoken');

const ErrorHandler = require('../../errors/ErrorHandler');
const {
    TokenEnum: {JWT_REFRESH_SECRET},
    responseStatusCodes: {BAD_REQUEST, UNAUTHORIZED},
    requestHeaders: {AUTHORIZATION}
} = require('../../constants');

const {responseCustomCode: {NOT_VALID_TOKEN, NOT_VALID}} = require('../../errors');
const {authService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.code));

        jwt.verify(token, JWT_REFRESH_SECRET, err => {
            if (err) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.code));
        });

        const tokensFromDataBase = await authService.getTokenByParams({refresh_token: token});

        if (!tokensFromDataBase) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.code));

        req.userId = tokensFromDataBase.userId;

        next();
    } catch (e) {
        next(e);
    }
};
