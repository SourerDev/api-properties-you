const { Router } = require('express')

const router = Router()

const {
  createMembership,
  getAllMemebership,
} = require('../controllers/memberships')

router.post('/membershisp/createMembership', createMembership)
router.get('/membershisp/getAllMembership', getAllMemebership)

module.exports = router
