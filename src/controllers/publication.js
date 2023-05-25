const { Op } = require("sequelize");
const {
  Publication,
  User,
  Property,
  House,
  Apartment,
  City,
  PH,
  Ranch,
} = require("../db");
const { checkRequiredPublicationEntries, PropertyType } =
  require("../utils").entries;

module.exports = {
  publishProperty: async function (req, res) {
    const info = req.body;

    const boundCheckRequiredPublicationEntries =
      checkRequiredPublicationEntries.bind(require("../utils").entries);

    const { missing, message } = boundCheckRequiredPublicationEntries(info);

    if (missing)
      return res.status(400).json({
        error: {
          message,
        },
      });
    try {
      await Publication.create(info);
      res.status(200).json({
        info: {
          message: "Your property is published correctly",
        },
      });
    } catch (error) {
      res.status(500).json({ error: { message: error.message } });
    }
  },
  getPublicationById: async function (req, res) {
    const { idPublication } = req.params;

    try {
      const _publication = await Publication.findOne({
        where: { idPublication },
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          {
            model: Property,
            include: [{ model: City }],
            attributes: { exclude: ["idUser", "idCity"] },
          },
        ],
        attributes: { exclude: ["idUser", "idProperty"] },
      });

      if (!_publication)
        return res.status(404).json({
          error: {
            message: "Publication not Found",
          },
        });
      const publication = {
        ..._publication.dataValues,
        User: { ..._publication.dataValues.User.dataValues },
        Property: {
          ..._publication.dataValues.Property.dataValues,
          City: {
            ..._publication.dataValues.Property.dataValues.City.dataValues,
          },
        },
      };
      const PROPERTY_TYPE = publication.Property.type;
      const { idProperty } = publication.Property;

      const PropertyTypeInfo = await getPropertyByType(
        PROPERTY_TYPE,
        idProperty
      );
      publication.Property[PROPERTY_TYPE] = {
        ...PropertyTypeInfo.dataValues,
      };

      res.status(200).json({
        info: {},
        publication,
      });
    } catch (error) {
      res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  },
  getPublications: async function (req, res) {
    try {
      const publications = await Publication.findAll({
        where: {
          enabled: true,
          [Op.or]: [{ state: "approved" }, { state: "pending" }],
        },
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          { model: Property, attributes: { exclude: ["idUser"] } },
        ],
        attributes: { exclude: ["idUser", "idProperty"] },
      });

      res.status(200).json({
        info: {
          quantity: publications.length,
        },
        publications,
      });
    } catch (error) {}
  },
  disablePublication: async function (req, res) {
    const { idPublication } = req.params;
    const { enabled } = req.query;
    try {
      const publication = await Publication.update(
        { enabled: enabled || false },
        {
          where: {
            idPublication,
          },
        }
      );

      res.status(200).json({
        info: {
          message: " all is correct",
        },
        publication,
      });
    } catch (error) {
      res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  },
};

async function getPropertyByType(PROPERTY_TYPE, idProperty) {
  const options = {
    where: {
      idProperty,
    },
    attributes: {
      exclude: ["idProperty", "idPh", "idRanch", "idApartment", "idHouse"],
    },
  };
  try {
    switch (PROPERTY_TYPE) {
      case PropertyType.HOUSE:
        return await House.findOne(options);
      case PropertyType.PH:
        return await PH.findOne(options);

      case PropertyType.APARTMENT:
        return await Apartment.findOne(options);
      case PropertyType.RANCH:
        return await Ranch.findOne(options);

      default:
        break;
    }
  } catch (error) {
    throw error.message;
  }
}
