class WrongLoginInfoException extends Error {
  constructor (message) {
    super(message)
    this.name = 'WrongLoginInfoException',
    this.message = 'Email or password is incorrect',
    this.httpStatusCode = 401
  }
}

module.exports = WrongLoginInfoException
