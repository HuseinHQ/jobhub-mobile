function errorHandler(err, req, res, next) {
  const { response } = err;

  let status = response.status;
  let message = response.data;

  res.status(status).json(message);
}

module.exports = errorHandler;
