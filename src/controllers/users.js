const {
  User,
  Property,
  Membership,
  MembershipType,
  Saved,
  Publication,
  City
} = require('../db')
const { sendMail, template } = require('../utils')

// here
const { hashPassword, verifyPassword, generateToken } = require('../utils')
const { default: jwtDecode } = require('jwt-decode')

// POST
const signUp = async (req, res) => {
  const { fName, lName, password, email, cellphone, userName } = req.body
  if (!fName || !lName || !cellphone || !password || !email)
    return res.status(400).send('Some data are missing')

  try {
    const findUser = await User.findOne({
      where: { email },
    })

    if (findUser) return res.status(409).send('User already exist')
    const hashPass = await hashPassword(password)
    const _user = await User.create({
      lName,
      fName,
      userName,
      email,
      cellphone,
      password: hashPass,
    })

    const user = {}
    for (const key in _user.dataValues) {
      if (key !== 'password') user[key] = _user[key]
    }

    const token = generateToken({
      id: user.idUser,
      email: user.email,
      type: user.userType,
    })

    await sendMail({
      from: 'Bienvenido <jhonny30ca@gmail.com>',
      to: user.email,
      subject: 'Ahora eres parte de Properties and You',
      template: template.registerMessage({userName: user.userName})
    });

    return res.send({
      info: {
        message: 'Usuario created successfully',
      },
      user,
      token,
    })
  } catch (err) {
    return res.status(500).send({ Error: err.message })
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(404).json({ Error: 'Email and password are required' })

  try {
    const _user = await User.findOne({
      where: { email },
    })

    if (!_user) return res.status(404).json({ Error: 'Email not found' })

    const passwordMatch = await verifyPassword(_user.password, password)
    if (!passwordMatch)
      return res.status(401).json({ Error: 'Incorrect email or password.' })

    if (_user.state === 'blocked')
      return res.status(401).json({ Error: 'This user is blocked' })

    const token = generateToken({
      id: _user.idUser,
      email: _user.email,
      type: _user.userType,
    })

    const user = {}
    for (const key in _user.dataValues) {
      if (key !== 'password') user[key] = _user[key]
    }

    res.json({ user, token })
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const googleSignin = async (req, res) => {
  const { credential } = req.body
  if (!credential) res.status(404).send('Credential is required')

  const details = jwtDecode(credential)

  try {
    let user = await User.findOne({
      where: { email: details.email },
      attributes: { exclude: ['password'] },
    })

    if (!user) {
      const hashPass = await hashPassword(`${details.jti}-${details.aud}`)
      const _user = await User.create({
        fName: details.given_name,
        lName: details.family_name,
        email: details.email,
        photo: details.picture,
        userName: details.given_name.replace(' ', '_'),
        password: hashPass,
        state: details.email_verified ? 'verified' : 'pending',
      })
      user = {}
      for (const key in _user.dataValues) {
        if (key !== 'password') user[key] = _user[key]
      }
    }

    const token = generateToken({
      id: user.idUser,
      email: user.email,
      type: user.userType,
    })

    return res.send({
      user,
      token,
    })
  } catch (error) {
    res.send(error.mesagge)
  }
}

// GET
const getUserById = async (req, res) => {
  const { idUser } = req.params
  try {
    const user = await User.findOne({
      where: { idUser },
      attributes: { exclude: ['password'] },
    })

    if (!user)
      return res.status(404).json({
        error: {
          message: 'user not found',
        },
      })

    res.status(200).json({ info: { status: 200, message: 'Success' }, user })
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Membership },
      attributes: { exclude: ['password'] },
    })

    if (!users.length)
      return res.send({
        error: { message: 'No hay usuarios en la base de datos' },
      })

    res.status(200).json({ info: { mesagge: 'Success' }, users })
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}

// PUT
const setState = async (req, res) => {
  const { idUser } = req.params
  const { state } = req.query

  if (!state)
    return res.status(400).json({ Error: "query ?state='' is required" })
  try {
    const user = await User.findByPk(idUser)
    if (!user?.idUser) return res.status(404).json({ Error: 'User not found' })

    await User.update(
      { state },
      {
        where: {
          idUser,
        },
      },
    )
    res.send({ Message: 'Correct updated' })
  } catch (err) {
    res.status(404).send({ Error: err.message })
  }
}

const updateUser = async (req, res) => {
  const { idUser } = req.params
  if (idUser === undefined || idUser == null)
    return res.status(400).json({ error: { message: 'idUser is required' } })

  try {
    const newData = {}
    for (const key in req.body) {
      if (['lName', 'fName', 'userName', 'cellphone', 'photo'].includes(key)) {
        newData[key] = req.body[key]
      }
    }

    await User.update(newData, {
      where: {
        idUser,
      },
    })

    const user = await User.findOne({
      where: { idUser },
      attributes: { exclude: ['password'] },
    })
    if (!user)
      return res.status(404).json({ error: { message: 'User not found' } })

    res.status(200).send({
      info: {
        message: 'user updated',
      },
      user,
    })
  } catch (err) {
    res.status(404).send({ Error: err.message })
  }
}

const setPremium = async (req, res) => {
  const { idUser } = req.params
  try {
    await User.update(
      { userType: 'premium' },
      {
        where: {
          idUser,
        },
      },
    )
    const user = await User.findByPk(idUser)

    res.status(200).send({ Message: user })
  } catch (err) {
    res.status(404).send({ Error: err.message })
  }
}

const updatePassword = async (req, res) => {
  const { idUser } = req.params
  const { password, newPassword } = req.body
  if (!idUser || !password || !newPassword)
    return res.status(401).json({ Error: 'Missing data' })

  try {
    const user = await User.findByPk(idUser)
    if (!user) return res.status(401).json({ Error: 'Not Found' })
    const passwordMatch = await verifyPassword(user.password, password)
    if (!passwordMatch)
      return res.status(401).json({ Error: 'Incorrect password.' })

    const hashPass = await hashPassword(newPassword)
    await User.update(
      { password: hashPass },
      {
        where: {
          idUser,
        },
      },
    )
    res.send('User Updated')
  } catch (error) {
    res.status(500).send({
      Error: error.mesagge,
    })
  }
}
// DELETE
const deleteUser = async (req, res) => {
  const { idUser } = req.params
  if (!idUser) return res.status(404).send('idUser is required')

  try {
    await User.destroy({ where: { idUser } })

    res.json({ Message: 'User delete correctly' })
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}

const getSaveds = async (req, res) => {
  try {
    const { idUser } = req.params
    const publications = await Saved.findAll({
      where: {
        UserIdUser: idUser,
      },
      include: [
        {
          model: Publication,
          include: [
            { model: User, attributes: { exclude: ['password'] } },
            {
              model: Property,
              include: [{ model: City }],
              attributes: { exclude: ['idUser', 'idCity'] },
            },
          ],
          attributes: { exclude: ['idUser', 'idProperty'] },
        },
      ],
      attributes: { exclude: ['id', 'PublicationIdPublication'] },
    })
    res.json({
      quantity: publications.length,
      publications,
    })
  } catch (error) {
    res.status(500).json({ error: { message: error.message}})
  }
}

module.exports = {
  deleteUser,
  getUserById,
  getUsers,
  googleSignin,
  setPremium,
  setState,
  signUp,
  signIn,
  updateUser,
  updatePassword,
  getSaveds,
}
