const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  console.log("🚀 ~ file: errorHandler.js:3 ~ errorHandler ~ res:", res);
  console.log("🚀 ~ file: errorHandler.js:3 ~ errorHandler ~ err:", err);

  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case "ERR_HTTP_HEADERS_SENT": // Add this case for ERR_HTTP_HEADERS_SENT error
      res.json({
        title: "Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: "Something went wrong!",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
  next(err);
};

module.exports = errorHandler;
