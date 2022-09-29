const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser, requireAuthRole } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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
  '/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    const reviewsAll = await Review.findAll({
      // attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
       where: { userId: user.id },
       //group: ['Spot.id', 'Review.id', 'User.id'],
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
        {
          model: ReviewImage,
          //where: {reviewId: Review.id}
          attributes: ["id", "url"]
        }
      ],
    });

    let Reviews = []
    reviewsAll.forEach(review => {
      Reviews.push(review.toJSON())
    })

    Reviews.forEach(review => {
      review.ReviewImages.forEach(image => {
          review.Spot.previewImage = image.url

      })
      if(!review.ReviewImages[0]) {
        review.Spot.previewImage = 'no preview image'
          }
      })


    return res.json({Reviews})
  })










module.exports = router;
