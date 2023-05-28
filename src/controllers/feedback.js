const { User, Feedback, Property } = require('../db')

const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body)

    res.status(201).json({
      Message: 'feedback creado',
      payload: feedback,
    })
  } catch (err) {
    res.status(401).json({ Error: err.message })
  }
}

const feedbackByIdProperty = async (req, res, next) => {
  console.log('holaaaa')
  try {
    const feedback = req.params.id

    if (feedback) {
      const sql = await Feedback.findByPk(feedback)
      res.status(200).json(sql)
    }
  } catch (error) {
    // Passes errors into the error handler
    return next(error)
  }
}

//

const feedbackByIdUser = async (req, res, next) => {
  console.log('holaaassssa')
  try {
    const idUser = req.params.id_User

    if (idUser) {
      const answer = await Feedback.findAll()
      res.status(200).json(answer)
    }
  } catch (error) {
    // Passes errors into the error handler
    return next(error)
  }
}

const answerFeedback = async (req, res) => {
  const { idFeedback, answer } = req.body
  console.log(req.body, 'ñaaa')
  try {
    const feedback = await Feedback.findByPk(idFeedback)
    console.log('hermes')
    const newAnswerFeedback = await Feedback.update(req.body, {
      where: {
        idFeedback: idFeedback,
      },
    })
    console.log(newAnswerFeedback, 'lola', idFeedback, answer)
    if (newAnswerFeedback[0] === 0) throw new Error('Id inexistenteeee')
    res.status(200).send({ Message: feedback })
  } catch (err) {
    res.status(404).send({ Error: err.message })
  }
}

const deleteFeetback = async (req, res) => {
  const { idFeedback } = req.params
  try {
    if (!idFeedback) return res.send('Id inexistente')
    const deletedFeetback = await Feedback.destroy({
      where: { idFeedback },
    })
    res.status(200).json({ Message: 'Delete feedback succes' })
  } catch (err) {
    res.status(400).json({ Message: err.message })
  }
}

// const isBossFeedback = async (req, res, next) => {
//   const { id_User, idFeedback } = req.body;
//   try {
//     let feetBackData = await Feedback.findByPk(idFeedback);
//     // console.log(feetBackData, "la dataa");
//     let match = await Property.findByPk(feetBackData.id);

//     console.log(match.id_User, "la propiedad");
//     console.log(id_User, "el useer");
//     if (match.id_User === id_User) {
//       next();
//     }
//   } catch (err) {
//     return res.status(404).send({ Error: err.message });
//   }
// };

module.exports = {
  createFeedback,
  feedbackByIdProperty,
  feedbackByIdUser,
  answerFeedback,
  deleteFeetback,
}
