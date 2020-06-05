const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(60).required(),
    surname: Joi.string().trim().alphanum().min(2).max(60).required(),
});
