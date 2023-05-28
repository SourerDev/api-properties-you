const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'Authentication token not provided.' })
  } else {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'invalid token' })
      } else {
        req.user = { email: user.email, type: user.type }
        next()
      }
    })
  }
}

function handleJwtError(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Token no válido' })
  } else {
    next(err)
  }
}

// Authorization middleware by userType ↓

function noAuthorizeLogged(req, res, next) {
  if (req.user.type === 'logged') {
    return res
      .status(401)
      .json({ message: 'Action not authorized for this user' })
  }

  next()
  return null
}

function authorizePremium(req, res, next) {
  if (req.user.type !== 'premium') {
    return res
      .status(401)
      .json({ message: 'Action not authorized for this user' })
  }

  next()
  return null
}

function authorizeAdmin(req, res, next) {
  if (req.user.type !== 'admin') {
    return res
      .status(401)
      .json({ message: 'Action not authorized for this user' })
  }

  next()
  return null
}

module.exports = {
  authenticateToken,
  handleJwtError,
  authorizePremium,
  authorizeAdmin,
  noAuthorizeLogged,
}
