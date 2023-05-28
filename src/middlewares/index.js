const {
  authenticateToken,
  handleJwtError,
  noAuthorizeLogged,
  authorizePremium,
  authorizeAdmin,
} = require('./jwt/jwtAuthMiddleware')

module.exports = {
  authenticateToken,
  authorizeAdmin,
  authorizePremium,
  handleJwtError,
  noAuthorizeLogged,
}
