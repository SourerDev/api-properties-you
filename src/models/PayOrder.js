const { DataTypes } = require('sequelize')

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'PayOrder',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      idPage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkPage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      collectorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_User: {
        type: DataTypes.UUID,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAd: false,
    },
  )
}
