const bcrypt = require('bcrypt');
const {responseStatusCodes: {NOT_FOUND_CODE,}} = require('../../constants');
const {errors: {NOT_GET}, errorHandler} = require('../../errors');

module.exports = async (hashedPassword, password) => {
    const isPasswordEquals = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordEquals) throw new errorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.code);

};

