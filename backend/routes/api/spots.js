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
          attributes: []
        }],
    });

    let spotsList = [];
    spots.forEach(spot => {
      spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
      spot.SpotImages.forEach(image => {
        if (image.preview === true) {
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
    const existLats = await Spot.findAll({ where: { lat } });

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

    if (user) {
      const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });
      return res.json(spot)
    } else {
      const err = new Error('No user loged in');
      err.status = 400;
      err.title = "No user loged in";
      err.errors = ["No user loged in"];
      return next(err);
    };
  })

router.post(
  '/:spotId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { spotId } = req.params;
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      const err = new Error('The spot does not exist');
      err.status = 404;
      err.title = "The spot does not exist";
      err.errors = ["The spot does not exist"];
      return next(err);
    }

    if (spot.ownerId === user.id) {
      const newImage = await SpotImage.create({ spotId, url, preview })
      return res.json({
        id: newImage.id,
        url,
        preview
      })
    } else {
      const err = new Error('Current user is not the owner');
      err.status = 400;
      err.title = "Current user is not the owner";
      err.errors = ["Current user is not the owner"];
      return next(err);
    }
  })

router.get(
  '/current', restoreUser, async (req, res, next) => {
    const { user } = req;

    if (user) {
      const spots = await Spot.findAll({
        attributes: {
          include: [
            [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
          ]
        },
        where: { ownerId: user.id },
        group: ['Spot.id', 'SpotImages.id'], //need more info
        include: [
          {
            model: SpotImage,
          },
          {
            model: Review,
            attributes: []
          }],
      });

      let spotsList = [];
      spots.forEach(spot => {
        spotsList.push(spot.toJSON())
      })

      spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
          if (image.preview === true) {
            spot.previewImage = image.url
          }
        })
        if (!spot.previewImage) {
          spot.previewImage = 'no preview image'
        }
        delete spot.SpotImages
      })
      return res.json(spotsList)
    } else {
      const err = new Error('No user loged in');
      err.status = 400;
      err.title = "No user loged in";
      err.errors = ["No user loged in"];
      return next(err);
    }
  }
)

router.get(
  '/:spotId', restoreUser, async (req, res, next) => {

    const { spotId } = req.params;

    const spots = await Spot.findByPk(spotId, {
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
          [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"]
        ]
      },
      group: ['Spot.id', 'SpotImages.id', 'User.id'], //need more info
      include: [
        {
          model: SpotImage,
          attributes: ["id", "url", "preview"]
        },
        {
          model: Review,
          attributes: []
        },
        {
          model: User
        }
      ],
    });


    if(!spots) {
      const err = new Error('The provided spot id does not exist');
      err.status = 404;
      err.title = "The provided spot id does not exist";
      err.errors = ["The provided spot id does not exist"];
      return next(err);
    }

    const Owner = await User.findOne({
      where: {id: spots.ownerId},
      attributes: ["id", "firstName", "lastName"]
    })

   let spotsWithOwner = [];
      spotsWithOwner.push(spots.toJSON())

    spotsWithOwner.forEach(spot => {
        spot.Owner = Owner
        delete spot.User
    })
    return res.json(spotsWithOwner)
})

module.exports = router;
