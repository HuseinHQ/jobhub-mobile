function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal server error";

  if (
    (err.name === "BSONError" && err.message === "input must be a 24 character hex string, 12 byte Uint8Array, or an integer") ||
    "user_not_found"
  ) {
    status = 404;
    message = "User not found";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
