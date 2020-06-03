const Joi = require('joi');
const {errorHandler} = require('../../errors');

const {userValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {

    const user = req.body;

    const {error} = Joi.validate(user, userValidJoiSchema);

    if (error) return next(new errorHandler(error.details[0].message, 400, 4001));

    next();

};
