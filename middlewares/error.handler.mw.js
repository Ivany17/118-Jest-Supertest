const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports.sequalizeHandlerError = async (req, res, err, next) => {
    if(err instanceof UniqueConstraintError){
        return res.status(409).send(err);
    }
    if(err instanceof ValidationError){
        return res.status(400).send(err);
    }
    next(err);
}
module.exports.basicHandlerError = async (req, res, err, next) => {
    const statusError = err.status || 500;
    res.status(statusError).send({
        errors: [{message: err.message || 'Internal Server Error'}]
    })
}