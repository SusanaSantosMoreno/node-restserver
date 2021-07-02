const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    //si el middleware llega aquí, sigue con el siguiente.
    next();
}

module.exports = {
    validateFields
}