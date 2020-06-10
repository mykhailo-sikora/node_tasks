const Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string().trim().min(4).max(60).required(),
    price: Joi.number().integer().min(1).max(10000).required(),
    description: Joi.string().min(5).max(100)
});
