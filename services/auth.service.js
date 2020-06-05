const db = require('../dataBase').getInstance();

const {modelNamesEnum: {TOKEN}} = require('../constants');

module.exports = {

    getTokenByParams: (params) => {
        const TokenModel = db.getModels(TOKEN);
        return TokenModel.findOne({where: params});
    },

    createTokenPair: (tokens) => {
        const TokenModel = db.getModels(TOKEN);
        return TokenModel.create(tokens);
    },

    deleteByParams: (params) => {
        const TokenModel = db.getModels(TOKEN);
        return TokenModel.destroy({where: params});
    },
};
