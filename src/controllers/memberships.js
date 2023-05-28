const { Membership, MembershipType } = require('../db')

// id_Membership: "325c1472-31fc-475f-8894-b12daf86b8ee",
// id_User: "325c1472-31fc-475f-8894-b12daf86b8ee",
// id_Membership_type: "b8489941-74fe-469a-bfc8-51e8279dd21f",
// payment: 100,

// INGRESE PAGO
const createMembership = async (req, res) => {
  try {
    const createdMembership = await Membership.create(req.body)

    res
      .status(201)
      .json({ Message: 'Membership creado', payload: createdMembership })
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}
const getAllMemebership = async (req, res) => {
  try {
    console.log('holaaaaaa')
    const membershisp = await Membership.findAll()
    console.log('lleguee al membership')
    if (!membershisp.length) throw new Error('No hay membresias')

    res.status(200).json({ Message: 'Success', payload: membershisp })
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}

// funciomn qiue te devuelva los usuario dependiendo
// el tipo de membresia

module.exports = { createMembership, getAllMemebership }
