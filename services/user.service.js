const db = require('../dataBase').getInstance();

const {modelNamesEnum: {USERS}} = require('../constants');

module.exports = {
    create: (user) => {
        const UserModel = db.getModels(USERS);
        return UserModel.create(user);
    },
    getAll: () => {
        const UserModel = db.getModels(USERS);
        return UserModel.findAll();
    },
    getByParams: (params) => {
        const UserModel = db.getModels(USERS);
        return UserModel.findOne({where: params});
    },
    getUserById: (userId) => {
        const UserModel = db.getModels(USERS);
        return UserModel.findByPk(userId);
    },
    delete: (id) => {
        const UserModel = db.getModels(USERS);
        return UserModel.destroy({where: {id}});
    },
    update: (id, user) => {
        const UserModel = db.getModels(USERS);
        return UserModel.update(user, {where: {id}})
    },
    signUp: (params) => {
        const UserModel = db.getModels(USERS);
        return UserModel.findOne({where: params})
    }
};
