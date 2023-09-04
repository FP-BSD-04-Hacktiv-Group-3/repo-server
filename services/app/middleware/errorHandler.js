function errorHandler(error, request, response, next) {
  let message = error.name;
  let statusCode = 500;

  console.log(error.name, 4, "error handler");
  console.log(error, 5, "error handler");

  switch (error.name) {
    case "StoreNotFound":
      statusCode = 404;
      message = "Toko tidak ditemukan";
      break;

    case "DataNotFound":
      statusCode = 404;
      message = "Produk tidak ditemukan";
      break;

    case "CannotUpdate":
      statusCode = 400;
      message = "Total barang tidak boleh dibawah 1";
      break;

    case "DuplicateNotAllowed":
      statusCode = 400;
      message = "Item ini sudah ditambahkan di keranjang kamu";
      break;

    case "DuplicateWishlistNotAllowed":
      statusCode = 400;
      message = "Item ini sudah ditambahkan di wishlist kamu";
      break;
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = { errorHandler };
