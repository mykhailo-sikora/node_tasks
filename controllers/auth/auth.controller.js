const {authService, userService} = require('../../services');
const {tokinizer, checkHashPassword} = require('../../helpers');
const {errorHandler} = require('../../errors');


module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getByParams({email});

            if (!user) {
                return next(new errorHandler('no user', 404, 4041))
            }
            await checkHashPassword(user.password, password);

            const tokens = tokinizer();

            await authService.createTokenPair({...tokens, userId: 1});

            res.json(tokens)
        } catch (e) {
            next(e);
        }
    },


    logoutUser: async (req, res) => {

        const access_token = req.get('Authorization');

        await authService.deleteByParams({access_token});

        res.sendStatus(200);
    }
};

