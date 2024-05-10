class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;