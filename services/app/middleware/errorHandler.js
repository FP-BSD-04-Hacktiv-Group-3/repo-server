function errorHandler(error, request, response, next) {
  let message = error.name;
  let statusCode = 500;

  console.log(error.name, 4, "error handler");
  console.log(error, 5, "error handler");

  switch (error.name) {
    case "DataNotFound":
      statusCode = 404;
      message = "Data tidak ditemukan";
      break;

    case "CannotUpdate":
      statusCode = 400;
      message = "Total barang tidak boleh dibawah 1";
      break;

      case "DuplicateNotAllowed":
        statusCode = 400;
        message = "Item ini sudah ditambahkan di keranjang kamu";
        break;
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = { errorHandler };
