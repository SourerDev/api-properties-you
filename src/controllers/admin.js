const { Property, User } = require('../db')

const deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    await User.update({ state: true }, { where: { idUser: id } })
    res.send('Se baneo al usuario')
  } catch (error) {
    next(error)
  }
}

const restoreUser = async (req, res, next) => {
  const { id } = req.params
  try {
    await User.update({ state: false }, { where: { idUser: id } })
    res.send('Se restauro al usuario')
  } catch (error) {
    next(error)
  }
}

// Convierte en Admin a un usuario con esta ruta
const acces = async (req, res) => {
  const { id } = req.query

  try {
    await User.update({ userType: 'admin' }, { where: { idUser: id } })
    res.send('Eres Admin !')
  } catch (e) {
    res.send('todo mal')
  }
}

const userDates = async (req, res, next) => {
  try {
    const user = await User.findAll()
    const allDates = user.map(
      (a) => `${a.createdAt.getMonth()}1-${a.createdAt.getFullYear()}`,
    )
    res.send(allDates)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteUser,
  restoreUser,
  acces,
  userDates,
}
