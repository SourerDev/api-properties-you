const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      idUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        get() {
          return this.getDataValue('active') ? 'online' : 'offline'
        },
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue:
          'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png',
      },
      user_auth_0: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      rating: {
        type: DataTypes.ENUM('0', '1', '2', '3', '4', '5'),
        defaultValue: '0',
      },
      userType: {
        type: DataTypes.ENUM('admin', 'premium', 'logged'),
        defaultValue: 'logged',
      },
      cellphone: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      state: {
        type: DataTypes.ENUM('pending', 'normal', 'blocked'),
        defaultValue: 'pending',
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAd: false,
    },
  )
}
