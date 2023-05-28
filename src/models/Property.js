const { DataTypes } = require('sequelize')
const { PropertyType } = require('../utils').entries

module.exports = (sequelize) => {
  sequelize.define(
    'Property',
    {
      idProperty: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      geolocation: {
        type: DataTypes.JSON(),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      bedrooms: {
        type: DataTypes.INTEGER,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
      },
      squareMeters: {
        type: DataTypes.DOUBLE,
      },
      yearBuilt: {
        type: DataTypes.INTEGER,
      },
      amenities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      type: {
        type: DataTypes.ENUM(
          PropertyType.HOUSE,
          PropertyType.PH,
          PropertyType.APARTMENT,
          PropertyType.RANCH,
        ),
      },
    },
    {
      timestamps: false,
    },
  )
}
