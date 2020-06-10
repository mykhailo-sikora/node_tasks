const {userService, emailService} = require('../../services');
const {hashPassword, checkHashPassword} = require('../../helpers');
const {
    EmailActionEnums: {
        USER_REGISTER,
        USER_UPDATE_USER,
        USER_DELETE_USER
    }
} = require('../../constants');

const {errorHandler} = require('../../errors');


module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await userService.getAll();

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;

            user.password = await hashPassword(user.password);

            await userService.create(user);
            await emailService.sendMail(user.email, USER_REGISTER, {user});

            res.sendStatus('201');
        } catch (e) {
            res.json(e)
        }
    },

    getUser: async (req, res) => {
        try {
            const {userId} = req.params;

            const user = await userService.getUserById(userId);

            res.json(user)
        } catch (e) {

            res.json(e)
        }
    },

    deleteUser: async (req, res, next) => {

        try {
            const {userId} = req.params;
            const user = req.body;

            const isDeleted = await userService.delete(userId);

            await emailService.sendMail(user.email, USER_DELETE_USER, {user});

            if (isDeleted) {
                res.sendStatus(204)
            } else {
                return next(new errorHandler('the user has not been deleted', 400, 4001))
            }

        } catch (e) {
            res.json(e.message)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.body;

            user.password = await hashPassword(user.password);

            const [isUpdate] = await userService.update(userId, user);
            await emailService.sendMail(user.email, USER_UPDATE_USER, {user});
            if (isUpdate) {
                res.sendStatus(200)
            } else {
                return next(new errorHandler('the user has not been updated', 400, 4001))
            }

        } catch (e) {
            res.json(e.message)
        }
    },

    authUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.signUp({email});

            if (!user) {
                return next(new errorHandler('User is not found', 404, 4041));
            }

            await checkHashPassword(user.password, password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
