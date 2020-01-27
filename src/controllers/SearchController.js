const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
  //busca todos devs num raio de 10km
  //filtrar por tecnologias
  async index(req, res) {
    const { latitude, longitude, techs } = req.body;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      }
    })

    return res.json({ devs: devs });
  }
}