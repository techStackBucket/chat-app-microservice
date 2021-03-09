require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes')
const errorHandler = require('./helpers/errorHandler')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', router);

app.use(errorHandler)

module.exports = app