const {errorHandler, responseCustomCode: {NOT_UPLOAD_PHOTO, NOT_UPLOAD_DOC}} = require('../../errors');
const {responseStatusCodes: {BAD_REQUEST}} = require('../../constants');

module.exports = (req, res, next) => {

    if (req.photos.length > 1) return next(new errorHandler(`${NOT_UPLOAD_PHOTO.message}`, BAD_REQUEST, NOT_UPLOAD_PHOTO.code));
    if (req.docs.length) return next(new errorHandler(`${NOT_UPLOAD_DOC.message}`, BAD_REQUEST, NOT_UPLOAD_DOC.code));

    next();
};
