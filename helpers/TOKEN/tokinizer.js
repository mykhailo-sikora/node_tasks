const jwt = require('jsonwebtoken');

const {wordsForTokenizer: {JWT_SECRET, JWT_REFRESH_SECRET}} = require('../../constants');

module.exports = () => {

    const access_token = jwt.sign({}, JWT_SECRET, {expiresIn: '10h'});
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '1d'});

    return {
        access_token,
        refresh_token
    }

};
