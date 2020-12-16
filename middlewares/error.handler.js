/**
 * Error handler
 */
module.exports = async (err, req, res, next) => {
  // Error message
  let statusCode = err.status || 500;
  let error = { status: statusCode, message: err.message };

  if (process.env.NODE_ENV !== "production") {
    error = { ...error, stack: err.stack };
  }

  res.status(statusCode).json(error);
};
