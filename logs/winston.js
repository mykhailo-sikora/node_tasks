const winston = require('winston');
const path = require('path');

const options = {
    errorFile: {
        filename: path.join(process.cwd(), 'logs', 'error.json'),
        "handleExceptions": true,
        json: true
    }
};

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File(options.errorFile)
    ],
    exitOnError: true
});
