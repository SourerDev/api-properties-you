const axios = require('axios')
const { users, properties } = require('../data/data.json')
const {
  User,
  Property,
  House,
  PH,
  Apartment,
  City,
  Ranch,
  Publication,
} = require('../db')
const { hashPassword } = require('../utils')
require('dotenv').config()

const { ADMIN } = process.env

async function addUsers() {
  try {
    if (ADMIN?.length) {
      const MY_ADMIN = JSON.parse(ADMIN)
      await addAdmin(MY_ADMIN)
    }

    const newUsers = users.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password),
    }))

    const usersWithHashedPasswords = await Promise.all(newUsers)
    await User.bulkCreate(usersWithHashedPasswords)

    return 'Ok → users added'
  } catch (error) {
    return error.message
  }
}

async function addAdmin(Admin) {
  if (!Admin) return

  const hashPass = await hashPassword(Admin.password)
  await User.create({ password: hashPass, ...Admin })
}

function getPropertiesByType(type) {
  const propertiesByType = properties
    .map((property) => ({
      ...property.type,
      idProperty: property.property.idProperty,
    }))
    .filter((property) => property.type === type)

  return propertiesByType
}

async function addUsersPremium() {
  const ramdoms = ramdomsUsers(properties.length, users.length - 1)
  const usersIds = Array.from(new Set(ramdoms))

  try {
    const usersPremium = usersIds.map(async (idUser) =>
      User.update(
        { userType: 'premium' },
        {
          where: {
            idUser,
          },
        },
      ),
    )

    await Promise.all(usersPremium)
    return ramdoms
  } catch (error) {
    return error.message
  }
}

async function addProperties() {
  const usersPremium = await addUsersPremium()

  const allProperties = properties.map((property, i) => ({
    ...property.property,
    idUser: usersPremium[i],
    type: property.type.type,
    publish: property.publish,
  }))
  await Property.bulkCreate(allProperties)

  const publish = allProperties.map((property) => ({
    idProperty: property.idProperty,
    idUser: property.idUser,
    ...property.publish,
  }))

  await Publication.bulkCreate(publish)

  const Houses = getPropertiesByType('house')
  const PHs = getPropertiesByType('ph')
  const Apartments = getPropertiesByType('apartment')
  const Ranches = getPropertiesByType('ranch')

  await House.bulkCreate(Houses)
  await PH.bulkCreate(PHs)
  await Apartment.bulkCreate(Apartments)
  await Ranch.bulkCreate(Ranches)

  return 'Ok → properties added'
}

function ramdomsUsers(size, num) {
  const ramdoms = []

  for (let i = 0; i < size; i++) {
    const ramdomIndex = Math.floor(Math.random() * (num + 1))
    ramdoms.push(users[ramdomIndex].idUser)
  }

  return ramdoms
}

async function addCities() {
  const URL =
    'https://apis.datos.gob.ar/georef/api/municipios?campos=id,nombre,%20provincia.nombre&max=5000'
  try {
    const { data } = await axios.get(URL)

    const cities = data.municipios.map((city) => ({
      idCity: city.id,
      name: city.nombre,
      province: city.provincia.nombre,
      string: `${city.nombre}, ${city.provincia.nombre}`,
    }))

    await City.bulkCreate(cities)

    return 'Ok → cities added'
  } catch (error) {
    return error.message
  }
}

async function addInformation() {
  console.log(await addUsers())
  console.log(await addCities())
  console.log(await addProperties())
}

module.exports = {
  addUsers,
  addProperties,
  addCities,
  addInformation,
}
