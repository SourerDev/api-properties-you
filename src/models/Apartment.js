const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Apartment',
    {
      idApartment: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      floorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      elevator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      balcony: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      gym: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  )
}
