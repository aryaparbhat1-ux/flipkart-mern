const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB ObjectId
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Invalid JWT
    if (err.name === "JsonWebTokenError") {
        const message = "JWT Error";
        err = new ErrorHandler(message, 400);
    }

    // Expired JWT
    if (err.name === "TokenExpiredError") {
        const message = "JWT is Expired";
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
