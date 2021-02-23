class UserAlreadyExist extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserAlreadyExist'
    this.message = 'User already exist with this email'
    this.httpStatusCode = 400
  }
}

module.exports = UserAlreadyExist