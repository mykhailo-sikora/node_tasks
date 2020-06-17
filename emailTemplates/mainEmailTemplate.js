const {
    EmailActionEnum: {
        USER_UPDATE_PRODUCT,
        USER_ADD_PRODUCT,
        USER_DELETE_PRODUCT,
        USER_DELETE_USER,
        USER_UPDATE_USER,
        USER_REGISTER,
        USER_FORGOT_UPDATE_PRODUCT
    }
} = require('../constants');


module.exports = {
    [USER_REGISTER]: {
        subject: '[TruShopByRykojop] REGISTRATION',
        templateName: 'registrationUserTemplate'
    },

    [USER_DELETE_USER]: {
        subject: '[TruShopByRykojop] ACCOUNT WAS DELETED ',
        templateName: 'deleteUserTemplate'
    },

    [USER_UPDATE_USER]: {
        subject: '[TruShopByRykojop] ACCOUNT WAS UPDATED',
        templateName: 'updateUserTemplate'
    },

    [USER_ADD_PRODUCT]: {
        subject: '[TruShopByRykojop] CREATE PRODUCT',
        templateName: 'addProductTemplate'
    },

    [USER_UPDATE_PRODUCT]: {
        subject: '[TruShopByRykojop] UPDATE PRODUCT',
        templateName: 'updateProductTemplate'
    },

    [USER_DELETE_PRODUCT]: {
        subject: '[TruShopByRykojop] DELETE PRODUCT',
        templateName: 'deleteProductTemplate'
    },
    [USER_FORGOT_UPDATE_PRODUCT]: {
        subject: '[TruShopByRykojop] UPDATE FOTO BY PRODUCT',
        templateName: 'userUpdatePhotoByProd'
    },
};
