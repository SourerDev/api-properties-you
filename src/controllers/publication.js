const { Op } = require('sequelize')
const {
  Publication,
  User,
  Property,
  House,
  Apartment,
  City,
  PH,
  Ranch,
  Saved,
} = require('../db')
const { checkRequiredPublicationEntries, PropertyType } =
  require('../utils').entries

function addOpBetween(obj, key) {
  /* const { min, max } = obj[key]
  obj[key]
    ? (obj[key] = {
        [Op.between]: [min, max],
      })
    : delete obj[key] */
  if (obj[key]) {
    const { min, max } = obj[key]
    obj[key] = {
      [Op.between]: [min, max],
    }
  } else delete obj[key]

  return obj
}

module.exports = {
  publishProperty: async (req, res) => {
    const info = req.body

    const boundCheckRequiredPublicationEntries =
      checkRequiredPublicationEntries.bind(require('../utils').entries)

    const { missing, message } = boundCheckRequiredPublicationEntries(info)

    if (missing)
      return res.status(400).json({
        error: {
          message,
        },
      })
    try {
      await Publication.create(info)
      res.status(200).json({
        info: {
          message: 'Your property is published correctly',
        },
      })
    } catch (error) {
      res.status(500).json({ error: { message: error.message } })
    }
  },
  getPublicationById: async (req, res) => {
    const { idPublication } = req.params

    try {
      const _publication = await Publication.findOne({
        where: { idPublication },
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          {
            model: Property,
            include: [{ model: City }],
            attributes: { exclude: ['idUser', 'idCity'] },
          },
        ],
        attributes: { exclude: ['idUser', 'idProperty'] },
      })

      if (!_publication)
        return res.status(404).json({
          error: {
            message: 'Publication not Found',
          },
        })
      const publication = {
        ..._publication.dataValues,
        User: { ..._publication.dataValues.User.dataValues },
        Property: {
          ..._publication.dataValues.Property.dataValues,
          City: {
            ..._publication.dataValues.Property.dataValues.City.dataValues,
          },
        },
      }
      const PROPERTY_TYPE = publication.Property.type
      const { idProperty } = publication.Property

      const PropertyTypeInfo = await getPropertyByType(
        PROPERTY_TYPE,
        idProperty,
      )
      publication.Property[PROPERTY_TYPE] = {
        ...PropertyTypeInfo.dataValues,
      }

      res.status(200).json({
        info: {},
        publication,
      })
    } catch (error) {
      res.status(500).json({
        error: {
          message: error.message,
        },
      })
    }
  },
  getPublications: async (req, res) => {
    try {
      const publications = await Publication.findAll({
        where: {
          enabled: true,
          [Op.or]: [{ state: 'approved' }, { state: 'pending' }],
        },
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          {
            model: Property,
            include: [{ model: City }],
            attributes: { exclude: ['idUser', 'idCity'] },
          },
        ],
        attributes: { exclude: ['idUser', 'idProperty'] },
      })

      res.status(200).json({
        info: {
          quantity: publications.length,
        },
        publications: [...publications, ...publications],
      })
    } catch (error) {
      res.status(500).json({ Error: error.message })
    }
  },

  getFilteredPublications: async (req, res) => {
    function deleteEmptyKeys(obj) {
      for (const key in obj) {
        if (obj[key] === '' || obj[key] === null) {
          delete obj[key]
        }
      }
      return obj
    }

    try {
      let { byPublication, byProperty, byCity } = req.body
      byPublication = deleteEmptyKeys(byPublication)
      byProperty = deleteEmptyKeys(byProperty)
      byCity = deleteEmptyKeys(byCity)

      byPublication?.price ? addOpBetween(byPublication, 'price') : null
      byProperty?.squareMeters ? addOpBetween(Property, 'squareMeters') : null
      byProperty?.yearBuilt ? addOpBetween(Property, 'yearBuilt') : null

      const publications = await Publication.findAll({
        where: {
          enabled: true,
          [Op.or]: [{ state: 'approved' }, { state: 'pending' }],
          ...byPublication,
        },
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          {
            model: Property,
            attributes: { exclude: ['idUser', 'idCity'] },
            where: byProperty,
            include: [{ model: City, where: byCity }],
          },
        ],
      })

      if (publications.length) {
        res.status(200).json({
          info: {
            quantity: publications.length,
          },
          publications,
        })
      } else {
        const publications = await Publication.findAll({
          where: {
            enabled: true,
            [Op.or]: [{ state: 'approved' }, { state: 'pending' }],
          },
          include: [
            { model: User, attributes: { exclude: ['password'] } },
            {
              model: Property,
              include: [{ model: City }],
              attributes: { exclude: ['idUser', 'idCity'] },
            },
          ],
          attributes: { exclude: ['idUser', 'idProperty'] },
        })
        res.status(200).json({
          info: {
            quantity: publications.length,
            error: 'no publications with the indicated filters',
          },
          publications,
        })
      }
    } catch (error) {
      res.status(500).json({ Error: error.message })
    }
  },

  disablePublication: async (req, res) => {
    const { idPublication } = req.params
    const { enabled } = req.query
    try {
      const publication = await Publication.update(
        { enabled: enabled || false },
        {
          where: {
            idPublication,
          },
        },
      )

      res.status(200).json({
        info: {
          message: ' all is correct',
        },
        publication,
      })
    } catch (error) {
      res.status(500).json({
        error: {
          message: error.message,
        },
      })
    }
  },
  savePublication: async (req, res) => {
    const { idUser, idPublication } = req.body
    const { remove } = req.query
    try {
      const publication = await Publication.findByPk(idPublication)
      const user = await User.findByPk(idUser)
      if (!remove) {
        await user.addPublication(publication)
      } else {
        await user.removePublication(publication)
      }

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

      res.status(200).json({
        info: {
          quantity: publications.length,
        },
        publications,
      })
    } catch (error) {
      res.status(500).json({ error: { message: error.message } })
    }
  },
}

async function getPropertyByType(PROPERTY_TYPE, idProperty) {
  const options = {
    where: {
      idProperty,
    },
    attributes: {
      exclude: ['idProperty', 'idPh', 'idRanch', 'idApartment', 'idHouse'],
    },
  }
  try {
    switch (PROPERTY_TYPE) {
      case PropertyType.HOUSE:
        return await House.findOne(options)
      case PropertyType.PH:
        return await PH.findOne(options)

      case PropertyType.APARTMENT:
        return await Apartment.findOne(options)
      case PropertyType.RANCH:
        return await Ranch.findOne(options)

      default:
        break
    }
  } catch (error) {
    throw error.message
  }
}
