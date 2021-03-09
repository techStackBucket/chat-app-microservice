const db = require('../../src/helpers/db');
const getHashedPassword = require('../../src/helpers/security');
const { UserAlreadyExist, WrongLoginInfoException } = require('../../src/exceptions')
const { authenticate, createUser } = require("../../src/services/authService")
const { authServiceUser } = require("../sampleData")

const User = db.User;

describe('authService', () => {
  describe(('create'), () => {
    beforeEach(async () => {
      await User.deleteOne({ email: authServiceUser.email })
    })

    test('create user ', async () => {
      const result = await createUser({ email: authServiceUser.email, password: authServiceUser.password })

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        email: authServiceUser.email,
        modifiedDate: expect.any(Date),
        createdDate: expect.any(Date)
      }))
    })

    test('get UserAlreadyExist error if user is already exist', async () => {
      await createUser({ email: authServiceUser.email, password: authServiceUser.password })
      return expect(createUser({ email: authServiceUser.email, password: authServiceUser.password }))
        .rejects.toMatchObject(new UserAlreadyExist())
    })
  })

  describe('authenticate', () => {
    beforeAll(async () => {
      await User.deleteOne({ email: authServiceUser.email })

      const user = new User(authServiceUser)
      user.password = getHashedPassword(authServiceUser.password)
      await user.save();
    })

    test('authenticate user and get token', async () => {
      const result = await authenticate({ email: authServiceUser.email, password: authServiceUser.password })
      expect(result).toHaveProperty('token')
    })

    test('get WrongLoginInfoException error if email is wrong', () => {
      return expect(authenticate('wrong@email.com', authServiceUser.password))
        .rejects.toMatchObject(new WrongLoginInfoException())
    })

    test('get WrongLoginInfoException error if password is wrong', () => {
      return expect(authenticate(authServiceUser.email, '12345'))
        .rejects.toMatchObject(new WrongLoginInfoException())
    })
  })
})
