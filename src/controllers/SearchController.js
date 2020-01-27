const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
  //busca todos devs num raio de 10km
  //filtrar por tecnologias
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
          $maxDistance: 10000,
        }
      }
    })

    return res.json({ devs: devs });
  }
}