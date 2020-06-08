const Joi = require('joi');
const {errorHandler} = require('../../errors');

const {errors} = require('../../errors');
const {responseStatusCodes} = require('../../constants');

const {userValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {

    const user = req.body;

    const {error} = Joi.validate(user, userValidJoiSchema);

    if (error) return next(new errorHandler(error.details[0].message, responseStatusCodes.BAD_REQUEST, errors.NOT_VALID.code));

    next();

};
