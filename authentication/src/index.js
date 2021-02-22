require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', router);

app.listen(port, _ => {
  console.log(`Authentication service listening at http://localhost:${port}`)
})
