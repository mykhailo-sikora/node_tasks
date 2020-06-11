const jwt = require('jsonwebtoken');

const ErrorHandler = require('../../errors/ErrorHandler');
const {responseCustomCode: {NOT_VALID, NOT_VALID_TOKEN}} = require('../../errors');
const {authService} = require('../../services');
const {
    TokenEnum: {JWT_SECRET},
    requestHeaders: {AUTHORIZATION},
    responseStatusCodes: {BAD_REQUEST, UNAUTHORIZED}
} = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.code));

        jwt.verify(token, JWT_SECRET, err => {
            if (err) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.code));
        });

        const tokensFromDataBase = await authService.getTokenByParams({access_token: token});

        if (!tokensFromDataBase) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.code));

        req.userId = tokensFromDataBase.userId;

        next();
    } catch (e) {
        next(e);
    }
};
