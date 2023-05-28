const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Ranch',
    {
      idRanch: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      acreage: {
        type: DataTypes.DOUBLE,
      },
      barn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      pasture: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      pond: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  )
}
