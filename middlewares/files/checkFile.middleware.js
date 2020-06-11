const {errorHandler, responseCustomCode: {NOT_VALID_FILE, NOT_VALID_SIZE}} = require('../../errors');
const {responseStatusCodes: {BAD_REQUEST}} = require('../../constants');
const {filesSettingsEnum} = require('../../constants');

module.exports = (req, res, next) => {
    req.photos = [];
    req.docs = [];

    if (!req.photos) return next();

    const files = Object.values(req.files);

    for (let i = 0; i < files.length; i++) {
        const {size, mimetype, name} = files[i];
        if (filesSettingsEnum.PHOTO_MIMETYPES.includes(mimetype)) {
            if (size > filesSettingsEnum.MAX_PHOTO_SIZE) {
                return next(
                    new errorHandler(`${NOT_VALID_SIZE.message}. Max file size is ${filesSettingsEnum.MAX_DOC_SIZE}`,
                        BAD_REQUEST,
                        NOT_VALID_SIZE.code))
            }
            req.photos.push(files[i]);

        } else if (filesSettingsEnum.DOC_MIMETYPES.includes(mimetype)) {
            if (size > filesSettingsEnum.MAX_DOC_SIZE) {
                return next(
                    new errorHandler(`${NOT_VALID_SIZE.message}. Max file size is ${filesSettingsEnum.MAX_DOC_SIZE}`,
                        BAD_REQUEST,
                        NOT_VALID_SIZE.code))
            }
            req.docs.push(files[i]);

        } else next(new errorHandler(`File ${name} ${NOT_VALID_FILE.message}`, BAD_REQUEST, NOT_VALID_FILE.code))
    }
    next();
};
