const Joi = require('joi');

const {regexpEnum: {EMAIL}} = require('../../constants'); // EMAIL from constants

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(60).required(),
    surname: Joi.string().trim().alphanum().min(2).max(60).required(),
    email: Joi.string().regex(EMAIL).required(),
    password: Joi.string().trim().min(8).required()
});
