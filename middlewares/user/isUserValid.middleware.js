const Joi = require('joi');

const {errorHandler} = require('../../errors');
const {responseCustomCode: {NOT_VALID}} = require('../../errors');
const {responseStatusCodes: {BAD_REQUEST}} = require('../../constants');
const {userValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {
    try {
        const user = req.body;
        const {error} = Joi.validate(user, userValidJoiSchema);

        if (error) return next(new errorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.code));

        next();
    } catch (e) {
        next(e);
    }
};
