module.exports = function globalErrorHandler(error, req, res, next){
    if (error) {
        let statusCode = 500
        if (error.httpStatusCode) {
          statusCode = error.httpStatusCode
        }
    
        res.status(statusCode).json({
          error: {
            name: error.name,
            message: error.message
          }
        })
      } else {
        next()
      }
}