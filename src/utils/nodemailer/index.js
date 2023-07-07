const nodemailer = require('nodemailer')

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env

const config = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
}
const transport = nodemailer.createTransport(config)

async function sendMail({ from, to, subject, text, template }) {
  const response = await transport.sendMail({
    from,
    to,
    subject,
    text,
    html: template,
  })

  return response
}

module.exports = {
  sendMail,
}
