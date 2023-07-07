const { Router } = require('express')
const {
  signUp,
  signIn,
  getUserById,
  getUsers,
  setState,
  updateUser,
  setPremium,
  deleteUser,
  googleSignin,
  updatePassword,
  getSaveds,
} = require('../controllers/users')

const router = Router()
const { authenticateToken, authorizeAdmin } = require('../middlewares')

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', googleSignin)

router.get('/all', getUsers)
router.get('/saveds/:idUser', getSaveds)
router.get('/:idUser', getUserById)

router.put('/state/:idUser', authenticateToken, authorizeAdmin, setState)
router.put('/premium/:idUser', setPremium)
router.put('/new-password/:idUser', authenticateToken, updatePassword)
router.put('/:idUser', authenticateToken, updateUser)

router.delete('/:idUser', authenticateToken, deleteUser)

module.exports = router
