function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal server error";

  if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (err.name === "email_required") {
    status = 400;
    message = "Email is required";
  } else if (err.name === "password_required") {
    status = 400;
    message = "Password is required";
  } else if (err.name === "login_error") {
    status = 401;
    message = "Invalid email/password";
  } else if (err.name === "job_not_found") {
    status = 404;
    message = "Job Not Found";
  } else if (err.name === "company_not_found") {
    status = 404;
    message = "Company Not Found";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
