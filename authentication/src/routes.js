const express = require('express');
const { createUser } = require('./services/userService');
const { resultCodes } = require('./enums');

const router = express.Router();

router.post('/register', async function (req, res, next) {
    const { email, password } = req.body
    createUser({email, password})
        .then(() => res.status(201).json({ result: resultCodes.SUCCESS }))
        .catch(next)
})

module.exports = {
    router
}