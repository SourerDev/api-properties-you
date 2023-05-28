const { Router } = require('express')

const router = Router()

const {
  deleteUser,
  restoreUser,
  acces,
  userDates,
} = require('../controllers/admin')

router.put('/restoreUser/:id', restoreUser)
router.put('/deleteUser/:id', deleteUser)
router.put('/acces/:id', acces)
router.get('/userDates/', userDates)
module.exports = router
