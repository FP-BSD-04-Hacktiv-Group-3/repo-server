function errorHandler(error, request, response, next) {
  let message = error.name;
  let statusCode = 500;
  
  console.log(error.name, 4, "error handler");
  console.log(error, 5, "error handler");

  switch (error.name) {
    case "":
      break
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = errorHandler;
