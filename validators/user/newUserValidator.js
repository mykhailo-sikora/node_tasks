const Joi = require('joi');

const {regexpEnum} = require('../../constants'); // EMAIL from constants

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(60).required(),
    surname: Joi.string().trim().alphanum().min(2).max(60).required(),
    email: Joi.string().regex(regexpEnum.EMAIL).required(),
    password: Joi.string().trim().min(8).required()
});
