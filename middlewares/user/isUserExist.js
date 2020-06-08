const {userService} = require('../../services');
const {errorHandler} = require('../../errors');

const {errors} = require('../../errors');
const {responseStatusCodes} = require('../../constants');

module.exports = async (req, res, next) => {

    const {userId} = req.params;

    if (isNaN(userId) && +userId < 0) next(new errorHandler(errors.NOT_VALID.message, responseStatusCodes.BAD_REQUEST, errors.NOT_VALID.code));

    const user = await userService.getUserById(userId);

    if (!user) {
        return next(new errorHandler(errors.NOT_FOUND.message, responseStatusCodes.NOT_FOUND, errors.NOT_FOUND.code))
    }
    user.req = user;

    next();

};
