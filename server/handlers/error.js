function errorHandler(error, request, response, next) {
  /* returns nicely formated error object */
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong."
    }
  });
}

module.exports = errorHandler;
