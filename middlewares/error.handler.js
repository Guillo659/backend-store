const { stack } = require("../routes/products.routes")

function logErr (err, req, res, next) {
    console.error(err)
    next(err)
}

function errHandler (err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

function boomErrorHandler (err, req, res, next) {
    if (err.isBoom) {
        const { output } = err
        return res.status(output.statusCode).json(output.payload)
    }
    else {
        next(err)
    }
}

module.exports = { logErr, errHandler, boomErrorHandler }