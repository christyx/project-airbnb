const express = require('express');
const { User, Spot, Review, SpotImage, Sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();

router.get(
  '/', async (req, res) => {

     const spots = await Spot.findAll({
      attributes: {
        include: [
          [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
        ]
      },
      group: ['Spot.id', 'SpotImages.id'], //need more info
      include: [
        {
        model: SpotImage,
        },
        {
        model: Review,
        attributes:[]
        }],
     });

     let spotsList = [];
     spots.forEach(spot => {
      spotsList.push(spot.toJSON())
     })

     spotsList.forEach(spot => {
      spot.SpotImages.forEach(image => {
        if(image.preview === true) {
          spot.previewImage = image.url
        }
      })
      if (!spot.previewImage) {
        spot.previewImage = 'no preview image'
      }
      delete spot.SpotImages
    })

    return res.json(spotsList)
  }
);

router.post(
  '/', restoreUser, async (req, res, next) => {
    const { user } = req;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;


    const existLats = await Spot.findAll({ where: {lat}});

    if (existLats) {
      existLats.forEach(existLat => {
        if (existLat.lng === lng) {
          const err = new Error('Lat&lng failed');
          err.status = 400;
          err.title = "Lat&lng combination already exists";
          err.errors = ["Lat&lng combination already exists"];
          return next(err);
        }
      })
    }


    if(user) {
      const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price});

      return res.json(spot)
    } else {
      const err = new Error('No user loged in');
      err.status = 400;
      err.title = "No user loged in";
      err.errors = ["No user loged in"];
      return next(err);
    };

  })







module.exports = router;
