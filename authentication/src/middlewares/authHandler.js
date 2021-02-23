const jwt = require('jsonwebtoken')

const authHandler = (req, res, next) => {
  const authHeader = req.headers?.authorization
  const token = authHeader && authHeader.split(' ')[1]
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) 
      return res.sendStatus(401)

    req.user = user
    next()
  })
}

module.exports = authHandler