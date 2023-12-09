import createError from 'http-errors';

class HanddleErrors {
    badRequest = (err, res) => {
        const error = createError.BadRequest(err);
        return res.status(error.status).json({
            err: 1,
            mes: error.message
        });
    };

    internalServerError = (res) => {
        const error = createError.InternalServerError();
        return res.status(error.status).json({
            err: 1,
            mes: error.message
        });
    };

    routeNotFound = (req, res) => {
        const error = createError.NotFound('This ruote is not defined');
        return res.status(error.status).json({
            err: 1,
            mes: error.message
        });
    };
}

module.exports = new HanddleErrors;
