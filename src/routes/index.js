const { Router } = require('express')

const admin = require('./admin')
const cities = require('./cities')
const feedback = require('./feedback')
const interested = require('./interested')
const mercado = require('./mercado')
const membership = require('./memberships')
const properties = require('./properties')
const publish = require('./publish')
const users = require('./users')

const router = Router()

router.use('/', admin)
router.use('/city', cities)
router.use('/', feedback)
router.use('/', interested)
router.use('/', mercado)
router.use('/', membership)
router.use('/property', properties)
router.use('/publish', publish)
router.use('/user', users)

module.exports = router
