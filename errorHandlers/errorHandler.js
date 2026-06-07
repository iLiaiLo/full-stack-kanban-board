const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.path} :`, err.message);

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || null,
  };

  return res.status(statusCode).json(response);
};
export default errorHandler;
