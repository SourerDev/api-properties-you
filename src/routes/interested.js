const { Router } = require('express')

const router = Router()
const controller = require('../controllers/interested')

router.post('/interested/userInterested', controller.userInterested)

module.exports = router
