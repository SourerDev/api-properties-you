const { Router } = require('express')

const router = Router()

const {
  createFeedback,
  feedbackByIdProperty,
  feedbackByIdUser,
  answerFeedback,
  deleteFeetback,
  // isBossFeedback,
} = require('../controllers/feedback')

router.post('/feedback/createFeedback', createFeedback)
router.get('/feedback/property/:id_Property', feedbackByIdProperty)
router.get('/feedback/user/:id_User', feedbackByIdUser)
router.post('/feedback/answerFeedback', answerFeedback)
router.delete('/feedback/deleteFeetback/:id_Feedback', deleteFeetback)

module.exports = router
