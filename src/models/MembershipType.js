const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'MembershipType',
    {
      id_Membership_type: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      membership: {
        type: DataTypes.ENUM('Oro', 'Plata', 'Bronce'),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        get() {
          if (this.getDataValue('state')) {
            return 'Activado'
          }
          return 'Desactivado'
        },
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAd: false,
    },
  )
}
