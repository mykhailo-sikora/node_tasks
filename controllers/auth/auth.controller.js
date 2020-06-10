const Joi = require('joi');
const {authValidJoiSchema} = require('../../validators');
const {authService, userService} = require('../../services');
const {tokenizer, checkHashPassword} = require('../../helpers');
const {
    errorHandler, errors: {
       NOT_FOUND,
        NOT_VALID,
    }
} = require('../../errors');
const {
    requestHeaders: {AUTHORIZATION}, responseStatusCodes: {
        NOT_FOUND_CODE,
        BAD_REQUEST,
    }
} = require('../../constants');


module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const {error} = Joi.validate({email, password}, authValidJoiSchema);

            if (error) return next(new errorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.code));

            const user = await userService.getByParams({email});

            if (!user) {
                return next(new errorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.code))
            }
            await checkHashPassword(user.password, password);

            const tokens = tokenizer();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens)
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await authService.deleteByParams({access_token});

            res.sendStatus(200);
        } catch (e) {
            next(e)
        }
    },

    refreshUser: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            const userId = req.userId;

            const user = await userService.getUserById(userId);

            if (!user) {
                return next(new errorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.code))
            }

            const tokens = tokenizer();

            await authService.deleteByParams({refresh_token});

            await authService.createTokenPair({...tokens, userId});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};

