function errorHandler(error, request, response, next) {
  let message = error.name;
  let statusCode = 500;

  console.log(error.name, 4, "error handler");
  console.log(error, 5, "error handler");

  switch (error.name) {
    case "DataNotFound":
      statusCode = 404;
      message = "Data not Found";
      break;

    case "CannotUpdate":
      statusCode = 400;
      message = "Cart item cannot be 0";
      break;

    
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = { errorHandler };
