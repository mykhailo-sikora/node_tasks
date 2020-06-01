const db = require('../dataBase').getInstance();

module.exports = {
    create: (user) => {
        const UserModel = db.getModels('Users');
        return UserModel.create(user);
    },


    getAll: () => {
        const UserModel = db.getModels('Users');
        return UserModel.findAll();
    },


    getOne: (id) => {
        const UserModel = db.getModels('Users');
        return UserModel.findByPk(id);
    },


    delete: (id) => {
        const UserModel = db.getModels('Users');
        return UserModel.destroy({where: {id}});
    },


    update: (id, user) => {
        const UserModel = db.getModels('Users');
        return UserModel.update(user, {where: {id}})
    }
};
