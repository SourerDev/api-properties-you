const { Router } = require('express')

const router = Router()
const {
  createProperty,
  getAllProperties,
  getAllAddress,
  getPropertyById,
  disableProperty,
  uplaodProperty,
  deleteProperty,
} = require('../controllers/properties')

// here
const {
  authenticateToken,
  authorizePremium,
  noAuthorizeLogged,
} = require('../middlewares')

router.post('/', authenticateToken, authorizePremium, createProperty)

router.get('/all', getAllProperties)
router.get('/getAllAddress', getAllAddress)
router.get('/:idProperty', getPropertyById)

router.put('/disable/:id', disableProperty)
router.put('/:id', uplaodProperty)

router.delete(
  '/:idProperty',
  authenticateToken,
  authorizePremium,
  deleteProperty,
)

module.exports = router
