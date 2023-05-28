const { Sequelize } = require('sequelize')
require('dotenv').config()

const { PGDATABASE, DATABASE, SECRET_KEY, NODE_ENV, PORT } = process.env

let sequelize

if (NODE_ENV === 'production') {
  console.log('Production')
  sequelize = new Sequelize(PGDATABASE, { logging: false, native: false })
} else {
  console.log('Development')
  sequelize = new Sequelize(DATABASE, {
    logging: false,
    native: false,
  })
}

module.exports = {
  sequelize,
  SECRET_KEY,
  PORT,
}
