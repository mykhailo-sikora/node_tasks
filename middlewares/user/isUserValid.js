const Joi = require('joi');

const userValidationSchema = require('../../validators/user/newUserValidator');


module.exports = async (req, res, next) => {
    try {
        const {name, surname, email, password} = req.body;

        if (!name || !surname || !email || !password) throw new Error('User is not valid');

        if (!(name.length > 2 && surname.length > 2)) throw new Error('name or surname is not valid');

        if (password.length < 8) throw new Error('password is not valid');


        next();
    } catch (e) {
        res.json({error: e.message})
    }
};
