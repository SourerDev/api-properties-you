const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Saved',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      timestamps: false,
    },
  )
}
