const {EmailActionEnums} = require('../constants');

// TODO: add user name, product and other features

module.exports = {
    [EmailActionEnums.USER_REGISTER]: {
        subject: '[TruShopByRykojop] REGISTRATION',
        templateName: 'registrationUserTemplate'
    },

    [EmailActionEnums.USER_DELETE_USER]: {
        subject: '[TruShopByRykojop] ACCOUNT WAS DELETED ',
        templateName: 'deleteUserTemplate'
    },

    [EmailActionEnums.USER_UPDATE_USER]: {
        subject: '[TruShopByRykojop] ACCOUNT WAS UPDATED',
        templateName: 'updateUserTemplate'
    },

    [EmailActionEnums.USER_ADD_PRODUCT]: {
        subject: '[TruShopByRykojop] CREATE PRODUCT',
        templateName: 'addProductTemplate'
    },

    [EmailActionEnums.USER_UPDATE_PRODUCT]: {
        subject: '[TruShopByRykojop] UPDATE PRODUCT',
        templateName: 'updateProductTemplate'
    },

    [EmailActionEnums.USER_DELETE_PRODUCT]: {
        subject: '[TruShopByRykojop] DELETE PRODUCT',
        templateName: 'deleteProductTemplate'
    }

};
