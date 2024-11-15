//const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(error) {
        super();
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        this.message = 'Not able to validate data sent in the request';
        this.explanation = explanation;
        this.name = 'ValidationError';
        this.statusCode = StatusCodes.BAD_REQUEST;

    }
}

module.exports = ValidationError;