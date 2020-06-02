module.exports = class ErrorHandler extends Error {
    constructor(message, status, customCode) {
        super(message);
        this.status = status;
        this.custumCode = customCode;

        Error.captureStackTrace(this, this.constructor);
    }
};
