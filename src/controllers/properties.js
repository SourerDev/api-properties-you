const path = require('path')
const notifier = require('node-notifier')
const { Property, User, House, PH, Apartment, Ranch } = require('../db')
const { checkRequiredPropertyEntries, PropertyType } =
  require('../utils').entries

const {
  transport,
  messageForUsersCreateProperty,
} = require('../utils/nodemailer/nodemailer')

// POST
const createProperty = async (req, res) => {
  const PROPERTY = req.body
  const { type } = req.body

  const boundCheckRequiredPropertyEntries = checkRequiredPropertyEntries.bind(
    require('../utils').entries,
  )
  const { missing, message } = boundCheckRequiredPropertyEntries(PROPERTY)

  if (missing)
    return res.status(400).json({
      error: {
        message,
      },
    })

  const PROPERTY_TYPE = type.type
  try {
    const { idProperty } = await Property.create({
      ...PROPERTY,
      type: PROPERTY_TYPE,
    })

    if (PROPERTY_TYPE === PropertyType.HOUSE)
      await House.create({
        ...type,
        idProperty,
      })
    else if (PROPERTY_TYPE === PropertyType.PH)
      await PH.create({
        ...type,
        idProperty,
      })
    else if (PROPERTY_TYPE === PropertyType.APARTMENT)
      await Apartment.create({
        ...type,
        idProperty,
      })
    else if (PROPERTY_TYPE === PropertyType.RANCH)
      await Ranch.create({
        ...type,
        idProperty,
      })

    // const { id_User } = req.body;

    // const findUser = await User.findOne({
    //   where: {
    //     id_User: id_User,
    //   },
    // });

    // const email = findUser._previousDataValues.email;
    // const userName = findUser._previousDataValues.userName;

    // const stateMail = await transport.sendMail(
    //   messageForUsersCreateProperty(email, userName)
    // );

    // notify property created succes
    /* notifier.notify(
      {
        sound: true,
        wait: true,
        title: `Propiedad creada con exito! `,
        message: "Gracias por confiar en Properties&&you",
        icon: path.join(
          "https://res.cloudinary.com/dg05pzjsq/image/upload/v1669030750/propertiesandyouicon_c9h24a.png"
        ),
      },
      function (err, response) {
        console.log(err, response);
      }
    ); */

    res.status(201).json({
      info: {
        message: 'property created successfully',
        idProperty,
        type: PROPERTY_TYPE,
      },
    })
  } catch (err) {
    res.status(500).json({ Error: err.message })
  }
}

// GET
const getAllProperties = async (req, res) => {
  try {
    const Houses = await House.findAll({
      include: {
        model: Property,
        attributes: { exclude: ['idUser', 'idProperty'] },
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      },
      attributes: { exclude: ['idHouse'] },
    })

    const PHs = await PH.findAll({
      include: {
        model: Property,
        attributes: { exclude: ['idUser', 'idProperty'] },
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      },
      attributes: { exclude: ['idPh'] },
    })

    const Apartments = await Apartment.findAll({
      include: {
        model: Property,
        attributes: { exclude: ['idUser', 'idProperty'] },
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      },
      attributes: { exclude: ['idApartment'] },
    })

    const Ranches = await Ranch.findAll({
      include: {
        model: Property,
        attributes: { exclude: ['idUser', 'idProperty'] },
        include: [{ model: User, attributes: { exclude: ['password'] } }],
      },
      attributes: { exclude: ['idRanch'] },
    })

    const properties = [...Houses, ...PHs, ...Apartments, ...Ranches]

    if (!properties.length) throw new Error("There isn't properties")

    res.status(200).json({
      info: { message: 'success', quantity: properties.length },
      properties,
    })
  } catch (err) {
    res.status(500).json({
      error: {
        message: err.message,
      },
    })
  }
}

const getPropertyById = async (req, res) => {
  try {
    const { idProperty } = req.params
    const { type } = req.query

    let property
    if (type === 'house')
      property = await House.findOne({
        where: { idProperty },
        include: {
          model: Property,
          attributes: { exclude: ['idUser', 'idProperty'] },
          include: [{ model: User }],
        },
        attributes: { exclude: ['id'] },
      })
    else if (type === 'ph')
      property = await PH.findOne({
        where: { idProperty },
        include: {
          model: Property,
          attributes: { exclude: ['idUser', 'idProperty'] },
          include: [{ model: User }],
        },
        attributes: { exclude: ['id'] },
      })
    else if (type === 'apartment')
      property = await Apartment.findOne({
        where: { idProperty },
        include: {
          model: Property,
          attributes: { exclude: ['idUser', 'idProperty'] },
          include: [{ model: User }],
        },
        attributes: { exclude: ['id'] },
      })
    else
      property = await Property.findOne({
        where: { idProperty },
        include: {
          model: User,
        },
        attributes: { exclude: ['idUser'] },
      })

    if (!property)
      return res.status(404).json({ error: { message: 'Property not found' } })

    res.status(200).json({
      info: { message: 'Succes' },
      property,
    })
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
}

const getAllAddress = async (req, res) => {
  try {
    const addressUser = await Property.findAll({
      attributes: ['address'],
    })

    // Send all address to frontend array string
    const arrAddress = []
    addressUser.forEach((el) => arrAddress.push(el.toJSON().address))
    res.status(200).json({ Message: arrAddress })
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}

// Borrado logico Property => PUT
const disableProperty = async (req, res) => {
  const { id } = req.params
  const { state } = req.body

  try {
    const searchPropertyById = await Property.findByPk(id)

    if (!searchPropertyById) return res.send('Propiedad no encontrada')

    const uploadProperty = await Property.update(
      { ...req.body },
      {
        where: {
          id: id,
        },
      },
    )

    res.status(200).send({ Message: uploadProperty })
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}

const uplaodProperty = async (req, res) => {
  const { id } = req.params

  try {
    // let findProperty = await Property.findByPk(id);

    const newUploadProperty = await Property.update(req.body, {
      where: {
        id: id,
      },
    })

    const updatedProperty = req.body

    if (newUploadProperty[0] === 0) throw new Error('Propiedad inexistente')

    res
      .status(200)
      .json({ Message: 'Propiedad actualizada!', payload: updatedProperty })
  } catch (err) {
    res.status(404).json({ Error: err.message })
  }
}

// DELETE
const deleteProperty = async (req, res) => {
  const { idProperty } = req.params

  try {
    const deletedProperty = await Property.destroy({ where: { idProperty } })
    res.status(200).json({
      info: {
        message: 'Delete property succes',
      },
      deletedProperty,
    })
  } catch (err) {
    res.status(400).json({ Message: err.message })
  }
}

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  getAllAddress,
  disableProperty,
  uplaodProperty,
  deleteProperty,
}
