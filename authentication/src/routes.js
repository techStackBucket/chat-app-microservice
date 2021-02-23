const express = require('express');
const { createUser, authenticate } = require('./services/userService');
const { resultCodes } = require('./enums');

const router = express.Router();

router.post('/register', register)
router.post('/login', login)

module.exports = router;

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