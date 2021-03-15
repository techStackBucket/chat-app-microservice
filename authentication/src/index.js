require('dotenv').config()
const app = require('./server')

const port = process.env.PORT || 3000

app.listen(port, _ => {
  console.log(`Authentication service running on http://localhost:${port}`)
})
