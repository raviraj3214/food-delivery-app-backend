const AppError = require('../utils/AppError');
const ERROR_CODES = require('../utils/errorCodes');

const handleDuplicateError = (err) => {
  const field = Object.keys(err.keyPattern)[0];
  return new AppError(
    `${field} already exists!`,
    400,
    ERROR_CODES.DUPLICATE_ERROR
  );
};

const handleValidationError = (err) => {
  const errors = Object.keys(err.errors).reduce((acc, field) => {
    acc[field] = err.errors[field].message;
    return acc;
  }, {});
  return new AppError(
    'Validation error.',
    400,
    ERROR_CODES.VALIDATION_ERROR,
    errors
  );
};

const handleCastError = () => {
  return new AppError(
    'Resource not found or invalid path.',
    404,
    ERROR_CODES.CAST_ERROR
  );
};

const handleTokenExpiredError = () => {
  return new AppError(
    'Token expired. Please login again.',
    401,
    ERROR_CODES.TOKEN_EXPIRED
  );
};

const sendProdError = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      code: err.errorCode,
      details: err.errors || undefined,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const sendDevError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

  if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };

    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'CastError') error = handleCastError();
    if (error.name === 'TokenExpiredError') error = handleTokenExpiredError();

    return sendProdError(error, req, res);
  }

  // Development environment
  sendDevError(err, req, res);
};
