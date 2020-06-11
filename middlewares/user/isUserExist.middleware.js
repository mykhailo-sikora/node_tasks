const {userService} = require('../../services');
const {errorHandler} = require('../../errors');
const {responseCustomCode: {NOT_VALID}} = require('../../errors');
const {responseStatusCodes: {BAD_REQUEST, NOT_FOUND_CODE}} = require('../../constants');

module.exports = async (req, res, next) => {

    const {userId} = req.params;

    if (isNaN(userId) && +userId < 0) next(new errorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.code));

    const user = await userService.getUserById(userId);

    if (!user) return next(new errorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.code));

    user.req = user;

    next();
};
