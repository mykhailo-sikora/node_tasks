const {EmailActionEnums} = require('../constants');

// TODO: add user name, product and other features

module.exports = {
    [EmailActionEnums.USER_REGISTER]: {
        subject: '[TruShopByRykojop] REGISTRATION',
        templateName: 'registrationUserTemplate'
    },

    [EmailActionEnums.USER_FORGOT_PASS]: {
        subject: '[TruShopByRykojop] Ooops, maybe u forgot password? ',
        templateName: 'forgotTemplate'
    },

    [EmailActionEnums.USER_UPDATE_USER]: {
        subject: '[TruShopByRykojop] Great(!) u are update some information about yourself',
        templateName: 'updateUserTemplate'
    },

    [EmailActionEnums.USER_ADD_PRODUCT]: {
        subject: '[TruShopByRykojop] E-he-hey, user add new product',
        templateName: 'addProductTemplate'
    },

    [EmailActionEnums.USER_UPDATE_PRODUCT]: {
        subject: '[TruShopByRykojop] E-he-hey, user update product, all is correct?',
        templateName: 'updateProductTemplate'
    },

    [EmailActionEnums.USER_DELETE_PRODUCT]: {
        subject: '[TruShopByRykojop] E-he-hey, u delete some product, sure?',
        templateName: 'deleteProductTemplate'
    }

};
