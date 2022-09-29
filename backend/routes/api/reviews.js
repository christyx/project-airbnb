const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();

router.post(
  '/:reviewId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { reviewId } = req.params;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      const err = new Error('The review does not exist');
      err.status = 404;
      err.title = "The review does not exist";
      err.errors = ["The review does not exist"];
      return next(err);
    }

    const allImages = await ReviewImage.findAll({ where: { reviewId } })

    if (allImages.length > 5) {
      const err = new Error('Maximum number of images have been added for the review');
      err.status = 403;
      err.title = "Maximum number of images have been added for the review"
      err.errors = ["Maximum number of images have been added for the review"];
      return next(err);
    }

    if (review.userId === user.id) {
      const newImage = await ReviewImage.create({ reviewId, url })
      return res.json({
        id: newImage.id,
        url
      })
    } else {
      const err = new Error('Current user is not the owner');
      err.status = 400;
      err.title = "Current user is not the owner";
      err.errors = ["Current user is not the owner"];
      return next(err);
    }
  });

router.get(
  '/current', restoreUser, async (req, res, next) => {
    const { user } = req;

    if (user) {
      const reviews = await Review.findAll({
        attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
        where: { userId: user.id },
        group: ['Spot.id', 'Review.id'],
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"]
          },
          {
            model: Spot,
            attributes: {
              // include: [
              //   [Sequelize.fn("COUNT", Sequelize.col("review")), "numReviews"],
              // ],
              exclude: ["description", "createdAt", "updatedAt"]
            },
          },
          // {
          //   model: ReviewImage,
          //   //attributes: ["id", "reviewId"]
          // }
          // {
          //   model: ReviewImage,
          // }
        ],
      });
      return res.json(reviews)




    } else {
      const err = new Error('No user loged in');
      err.status = 400;
      err.title = "No user loged in";
      err.errors = ["No user loged in"];
      return next(err);
    }
  })










module.exports = router;
