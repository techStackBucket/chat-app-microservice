const { resultCodes } = require('../enums');

const errorHandler = async (error, req, res, next) => {
  if (error) {
    let statusCode = 500
    if (error?.httpStatusCode) {
      statusCode = error.httpStatusCode
    }

    res.status(statusCode).json({
      result: resultCodes.ERROR,
      error: {
        name: error.name,
        message: error.message
      }
    })
  } else {
    next()
  }
}

module.exports = errorHandler;
