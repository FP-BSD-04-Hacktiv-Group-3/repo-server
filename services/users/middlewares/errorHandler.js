function errorHandler(error, request, response, next) {
  let statusCode = 500;
  let message = error.name || error;

  switch (error.name) {
    case "":
      break;

    default:
      break;
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = errorHandler;
