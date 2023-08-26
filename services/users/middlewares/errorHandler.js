const errorHandlers = (err, req, res, next) => {
  console.log(err);

  let statusCode = 0;
  let message = "";

  switch (err.name) {
    case "Error not found":
      statusCode = 404;
      message = "Error not found";
      break;
    case "invalidAccount":
      statusCode = 401;
      message = "Invalid Email / Password";
      break;
    case "NotAuthorization":
      statusCode = 403;
      message = "Unauthorize";
      break;
    default:
      statusCode = 500;
      message = "Internal Server Error";
  }
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandlers;
