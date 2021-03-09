const app = require('../src/server')
const supertest = require('supertest')
const db = require('../src/helpers/db');
const { authenticate, createUser } = require("../src/services/authService")
const { routeUser } = require("./sampleData")

const User = db.User;
const request = supertest(app)

describe('auth Endpoints', () => {
    describe('auth required tests', () => {
        let token
        beforeAll(async () => {
            await User.deleteOne({ email: routeUser.email })
            await createUser({ email: routeUser.email, password: routeUser.password })
            const loginResult = await authenticate({ email: routeUser.email, password: routeUser.password })
            token = loginResult.token
        })

        test('check token as successfully and must return 200 with user-id in header ', async () => {
            const res = await request
                .get('/api/v1/check-token')
                .set({ authorization: `Bearer ${token}` })

            expect(res.headers['user-id']).toBeTruthy()
            expect(res.statusCode).toEqual(200)
        })

        test('must return 401 if token is wrong while checking token', async () => {
            const res = await request
                .get('/api/v1/check-token')
                .set({ Authorization: 'Bearer WrongToken' })

            expect(res.statusCode).toEqual(401)
        })

        test('must return 401 if token is not set while checking token', async () => {
            const res = await request
                .get('/api/v1/check-token')

            expect(res.statusCode).toEqual(401)
        })
    })

    describe('register tests', () => {
        beforeEach(async () => {
            await User.deleteOne({ email: routeUser.email })
        })

        test('register new user as successfully and must return 201', async () => {
            const res = await request
                .post('/api/v1/register')
                .send(routeUser)

            expect(res.statusCode).toEqual(201)
            expect(res.body.result).toBeTruthy()
        })

        test('must return 400 if user registered already', async () => {
            await createUser({ email: routeUser.email, password: routeUser.password })

            const res = await request
                .post('/api/v1/register')
                .send(routeUser)

            expect(res.statusCode).toEqual(400)
            expect(res.body.result).toBeTruthy()
        })
    })

    describe('login tests', () => {
        beforeAll(async () => {
            await User.deleteOne({ email: routeUser.email })
            await createUser({ email: routeUser.email, password: routeUser.password })
        })

        test('login user as successfully and must return 200', async () => {
            const res = await request
                .post('/api/v1/login')
                .send(routeUser)

            expect(res.statusCode).toEqual(200)
            expect(res.body.result).toBeTruthy()
        })

        test('must return 401 if user email is wrong', async () => {
            var user = { email: "wrongEmail", password: routeUser.password }

            const res = await request
                .post('/api/v1/login')
                .send(user)

            expect(res.statusCode).toEqual(401)
            expect(res.body.result).toBeTruthy()
        })

        test('must return 401 if user password is wrong', async () => {
            var user = { email: routeUser.email, password: 'wrongPassword'}

            const res = await request
                .post('/api/v1/login')
                .send(user)

            expect(res.statusCode).toEqual(401)
            expect(res.body.result).toBeTruthy()
        })
    })
})