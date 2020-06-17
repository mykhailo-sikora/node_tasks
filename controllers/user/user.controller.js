const uuid = require('uuid').v1();
const fsx = require('fs-extra').promises;
const path = require('path');

const {userService, emailService} = require('../../services');
const {hashPassword, checkHashPassword} = require('../../helpers');
const {
    responseStatusCodes: {
        NOT_FOUND_CODE,
        CREATED,
        NO_CONTENT,
        OK
    },
    EmailActionEnum: {
        USER_REGISTER,
        USER_UPDATE_USER,
        USER_DELETE_USER
    }
} = require('../../constants');

const {
    errorHandler,
    responseCustomCode: {
        NOT_UPDATE,
        NOT_GET,
        NOT_CREATED,
        NOT_DELETE,
        NOT_FOUND
    }
} = require('../../errors');


module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            if (!users) return next(new errorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.code));

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            const [profilePhoto] = req.photos;

            user.password = await hashPassword(user.password);

            const isCreated = await userService.create(user);
            const photoDir = `users/${isCreated.id}/photos`;
            const fileExtension = path.extname(profilePhoto.name);
            const photoName = `${uuid}${fileExtension}`;

            await fsx.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            await profilePhoto.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            await userService.update(isCreated.id, {photo: `${photoDir}/${photoName}`});

            if (!isCreated) return next(new errorHandler(NOT_CREATED.message, NOT_FOUND_CODE, NOT_CREATED.code));

            await emailService.sendMail(user.email, USER_REGISTER, {user});

            res.sendStatus(CREATED);
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
            const user = await userService.getUserById(userId);
            const isDeleted = await userService.delete(userId);

            if (!isDeleted) return next(new errorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.code));

            await emailService.sendMail(user.email, USER_DELETE_USER, {user});

            res.sendStatus(NO_CONTENT);

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

            if (!isUpdate) return next(new errorHandler(NOT_UPDATE.message, NOT_FOUND_CODE, NOT_UPDATE.code));

            await emailService.sendMail(user.email, USER_UPDATE_USER, {user});

            res.sendStatus(OK);

        } catch (e) {
            res.json(e.message)
        }
    },

    authUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.signUp({email});

            if (!user) return next(new errorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.code));

            await checkHashPassword(user.password, password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
