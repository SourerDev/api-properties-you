const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h',
  })

  return token
}

module.exports = {
  generateToken,
}
