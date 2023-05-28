const { Router } = require('express')

const router = Router()

const {
  publishProperty,
  getPublicationById,
  getPublications,
  disablePublication,
  savePublication,
} = require('../controllers/publication')
const { authenticateToken, authorizePremium } = require('../middlewares')

// POST
router.post('/', authenticateToken, authorizePremium, publishProperty)

// GET
router.get('/all', getPublications)
router.get('/:idPublication', getPublicationById)

// PUT
router.put('/save', savePublication)
router.put(
  '/disable/:idPublication',
  authenticateToken,
  authorizePremium,
  disablePublication,
)

module.exports = router
