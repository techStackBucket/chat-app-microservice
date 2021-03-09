const express = require('express');
const { createUser, authenticate } = require('./services/userService');
const { resultCodes } = require('./enums');
const authHandler = require('./middlewares');

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/check-token', authHandler, checkToken)

module.exports = router;

function checkToken(req, res) {
    res.setHeader('User-Id', req.user.id)
    res.sendStatus(200)
}

function register(req, res, next) {
    const { email, password } = req.body
    createUser({ email, password })
        .then(_ => res.status(201).json({ result: resultCodes.SUCCESS }))
        .catch(next)
}

function login(req, res, next) {
    authenticate(req.body)
        .then(data => res.json({ result: resultCodes.SUCCESS, data }))
        .catch(next)
}