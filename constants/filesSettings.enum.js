module.exports = {
    MAX_PHOTO_SIZE: 3 * 1024 * 1024,
    MAX_DOC_SIZE: 10 * 1024 * 1024,

    PHOTO_MIMETYPES: ['image/jpeg','image/jpg','image/pjpeg', 'image/png'],
    DOC_MIMETYPES: [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/msword',
        'application/pdf'
    ]
};
