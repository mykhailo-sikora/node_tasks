const {userService} = require('../../services');
const {errorHandler} = require('../../errors');

module.exports = async (req, res, next) => {

    const {userId} = req.params;

    if (isNaN(userId) || +userId < 0) next(new errorHandler('User is not valid', 400, 4001));

    const user = await userService.getOne(userId);

    if (!user) {
        return next(new errorHandler('User not found', 404, 4041))
    }
    user.req = user;

    next();

};
