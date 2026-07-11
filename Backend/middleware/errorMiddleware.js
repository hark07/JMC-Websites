const errorMiddleware = (error, req, res, next) => {
  console.log(error);

  res.status(error.statusCode || 500).json({
    success: false,

    message: error.message || "Server Error",
  });
};

export default errorMiddleware;
