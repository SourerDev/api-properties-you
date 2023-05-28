const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'Membership',
    {
      idMembership: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      idUser: {
        type: DataTypes.UUID,
      },

      idMembershipType: {
        type: DataTypes.UUID,
        defaultValue: '27990073-a398-4df6-89dd-533d457c47e8',
      },
      // Precio ya pagado por el usuario

      price: {
        type: DataTypes.INTEGER,
        allowNull: null,
        defaultValue: 100,
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
      // visa- Mastercard o Dinero en Cuenta en Mercado Pago
      payment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAd: true,
    },
  )
}
