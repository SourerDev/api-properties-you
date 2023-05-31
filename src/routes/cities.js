const { Router } = require('express')
const { getCityByName, getCities } = require('../controllers/cities')

const router = Router()

router.get('/all', getCities)
router.get('/:string', getCityByName)

module.exports = router
