const Joi = require('joi');
const {errorHandler} = require('../../errors');

const {userValidJoiSchema} = require('../../validators');


module.exports = async (req, res, next) => {
    try {

        const user = req.body;

        const {error} = Joi.validate(user, userValidJoiSchema);

        if (error) return next(new errorHandler('The user has not been validated, because one of us is a teapot', 418, 40018));

        next();
    } catch (e) {
        res.json('error', {message: e.message})
    }
};
