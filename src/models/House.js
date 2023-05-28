const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'House',
    {
      idHouse: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      floors: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      garage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      backyard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      pool: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    },
  )
}
