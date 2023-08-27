function errorHandler(error, request, response, next){
  let message = error.name || error
  let statusCode = 500

  switch (error.name) {
    case "":
      break;
  }

  response.status(statusCode).json({
    message
  })
}

module.exports = errorHandler