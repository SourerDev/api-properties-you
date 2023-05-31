const { Op } = require('sequelize')

const { City } = require('../db')

module.exports = {
  getCityByName: async (req, res) => {
    const { string } = req.params
    try {
      const cities = await City.findAll({
        where: {
          string: { [Op.iLike]: `%${string}%` },
        },
        limit: 10,
      })

      if (!cities.length) return res.status(404).send('no results')

      res.send(cities)
    } catch (error) {
      res.status(500).json({ Error: error.message })
    }
  },
  getCities: async (req, res) => {
    try {
      const cities = await City.findAll()
      res.send({
        info: {
          quantity: cities.length,
        },
        cities,
      })
    } catch (error) {
      res.status(500).json({ Error: error.message })
    }
  },
}
