const {userService} = require('../../services');
const {hashPassword, checkHashPassword} = require('../../helpers');

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

            res.sendStatus('201');
        } catch (e) {
            res.json(e)
        }
    },

    getUser: async (req, res) => {
        try {
            const {id} = req.params;

            const user = await userService.getOne(id);

            res.json(user)
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {

        try {
            const {id} = req.params;

            const isDeleted = await userService.delete(id);

            isDeleted ? res.sendStatus(204) : res.json({deleted: false})

        } catch (e) {
            res.json(e)
        }
    },

    updateUser: async (req, res) => {
        try {
            const {id} = req.params;
            const user = req.body;

            const [isUpdate] = await userService.update(id, user);

            isUpdate ? res.sendStatus(200) : res.json({updated: false});

        } catch (e) {
            res.json(e)
        }
    },

    authUser: async (req, res) => {

        const {email, password} = req.body;
        const user = await userService.signUp({email});

        if (!user) {

            throw new Error('User is not found');
        }

        await checkHashPassword(user.password, password);

        res.json(user);
    }
};
