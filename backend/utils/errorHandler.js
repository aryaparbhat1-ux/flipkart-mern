const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    console.log("ERROR =>", err);

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("JWT Error", 400);
    }

    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("JWT is Expired", 400);
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
