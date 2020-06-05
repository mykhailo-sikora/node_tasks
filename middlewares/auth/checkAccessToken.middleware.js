const jwt = require('jsonwebtoken');
const ErrorHandler = require('../../errors/ErrorHandler');

const {authService} = require('../../services');
const {wordsForTokenizer: {JWT_SECRET, JWT_REFRESH_SECRET}} = require('../../constants');


module.exports = async (req, res, next) => {

    const token = req.get('Authorization');

    if (!token) {
        return next(new ErrorHandler('No token', 400, 4002))
    }

    jwt.verify(token, JWT_SECRET, err => {
        if (err) {
            return next(new ErrorHandler('Not valid token', 401, 4011));
        }
    });

    const tokensFromDataBase = authService.getTokenByParams({access_token: token});

    if (!tokensFromDataBase) {
        return next(new ErrorHandler('Not valid token', 401, 4011));
    }

    req.userId = tokensFromDataBase.userId;
    next();

};
