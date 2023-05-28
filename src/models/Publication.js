const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Publication',
    {
      idPublication: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      state: {
        type: DataTypes.ENUM('pending', 'approved', 'acquired', 'blocked'),
        defaultValue: 'pending',
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      modality: {
        type: DataTypes.ENUM('sale', 'rental'),
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      idProperty: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    },
  )
}
