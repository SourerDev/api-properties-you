const { hashPassword, verifyPassword } = require('./hashPassword')
const { generateToken } = require('./jwt')
const entries = require('./entries')
const { sendMail } = require('./nodemailer')
const template = require('./nodemailer/templates')
module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  entries,
  sendMail,
  template,
}
