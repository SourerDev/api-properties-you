const bcrypt = require('bcrypt')

/**
 * @param {string} password
 * @return {string}
 */
async function hashPassword(password) {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

/**
 * @param {string} passwordHash
 * @param {string} password
 * @return {boolean}
 */
async function verifyPassword(passwordHash, password) {
  const match = await bcrypt.compare(password, passwordHash)
  return match
}

module.exports = {
  hashPassword,
  verifyPassword,
}
