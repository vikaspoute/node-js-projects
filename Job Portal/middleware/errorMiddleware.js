const errorMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: 500,
    message: err,
  };

  // missing field error
  if (err.name === "ValidationError") {
    (defaultError.statusCode = 400),
      (defaultError.message = Object.values(err.errors)
        .map((err) => err.message)
        .join(", "));
  }

  // duplicate error
  if (err.code && err.code === 11000) {
    (defaultError.statusCode = 400),
      (defaultError.message = `${Object.keys(err.keyValue)} already exists`);
  }

  res.status(defaultError.statusCode).json({
    message: defaultError.message,
  });
};

export default errorMiddleware;
