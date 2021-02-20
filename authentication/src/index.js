const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, _ => {
  console.log(`Authentication service listening at http://localhost:${port}`)
})
