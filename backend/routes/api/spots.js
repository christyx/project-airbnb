const express = require('express');
const { User, Spot, Review, SpotImage, Sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser, requireAuthRole } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSpotCreate = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    // .isLength({ min: 4 })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

router.get(
  '/', async (req, res) => {

    const spotsLists = await Spot.findAll({
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

    let Spots = [];
    spotsLists.forEach(spot => {
      Spots.push(spot.toJSON())
    })

    Spots.forEach(spot => {
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

    return res.json({ Spots })
  }
);

router.post(
  '/', requireAuth, validateSpotCreate, async (req, res, next) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const existLats = await Spot.findAll({ where: { lat } });

    if (existLats) {
      existLats.forEach(existLat => {
        if (existLat.lng === lng) {
          res.status(400)
          return res.json({
            message: "Lat&lng combination already exists",
            statusCode: 400
          })
        }
      })
    }
    const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });
    res.status(201)
    return res.json(spot)
  });

router.post(
  '/:spotId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { spotId } = req.params;
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      res.status(404)
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }

    if (spot.ownerId === user.id) {
      const newImage = await SpotImage.create({ spotId, url, preview })

      return res.json({
        id: newImage.id,
        url,
        preview
      })
    } else {
      await requireAuthRole(req, res, next);
    }
  });

router.get(
  '/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    const spotsAll = await Spot.findAll({
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

    let Spots = [];
    spotsAll.forEach(spot => {
      Spots.push(spot.toJSON())
    })

    Spots.forEach(spot => {
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
    return res.json({ Spots })
  }
);

router.get(
  '/:spotId', async (req, res, next) => {

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

    if (!spots) {
      res.status(404)
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }

    const Owner = await User.findOne({
      where: { id: spots.ownerId },
      attributes: ["id", "firstName", "lastName"]
    })

    let spotsWithOwner = [];
    spotsWithOwner.push(spots.toJSON())

    spotsWithOwner.forEach(spot => {
      spot.Owner = Owner
      delete spot.User
    })
    return res.json(spotsWithOwner[0])
  });

router.put(
  '/:spotId', requireAuth, validateSpotCreate, async (req, res, next) => {
    const { user } = req;
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
      res.status(404)
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }
    const existLats = await Spot.findAll({ where: { lat } });

    // if (existLats) {
    //   existLats.forEach(existLat => {
    //     if (existLat.lng === lng) {

    //       if(existLat.lng.toString() === spotId) {
    //         res.status(400)
    //         return res.json({
    //         message: "Lat&lng combination already exists",
    //         statusCode: 400
    //       })
    //     }
    //     }
    //   })
    // } else
    if (spot.ownerId === user.id) {
      await spot.update(
        { address, city, state, country, lat, lng, name, description, price }
      )
      return res.json(spot)
    } else {
      await requireAuthRole(req, res, next);
    }
  });

router.post(
  '/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { spotId } = req.params;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
      const err = new Error('The spot does not exist');
      err.status = 404;
      err.title = "The spot does not exist";
      err.errors = ["The spot does not exist"];
      return next(err);
    }

    const existedReview = await Review.findOne({
      where: { spotId, userId: user.id }
    })
    if (existedReview) {
      const err = new Error('A review already exists for the spot from the current user');
      err.status = 403;
      err.title = "A review already exists for the spot from the current user";
      err.errors = ["A review already exists for the spot from the current user"];
      return next(err);
    }
    const newReview = await Review.create({
      spotId,
      userId: user.id,
      review,
      stars
    })

    const theNewReview = await Review.findOne({
      attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
      where: { spotId, userId: user.id }
    })
    return res.json(theNewReview)
  })

router.delete(
  '/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
      res.status(404)
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }

    if (spot.ownerId === user.id) {
      await spot.destroy()
      res.status(200)
      return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    } else {
      await requireAuthRole(req, res, next);
    }
  })



module.exports = router;
