const { validationResult } = require('express-validator');
const { check, query } = require('express-validator');
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    _res.status(400)
    return _res.json({
      message: "Validation error",
      statusCode: 400,
      errors
    })
  }
  next();
};

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

const validateGetAllSpotsQueries = [
  query("page")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Page must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Size must be greater than or equal to 0"),
  query("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  query("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  query("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  query("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Size must be greater than or equal to 0"),
  query("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Size must be greater than or equal to 0"),
  handleValidationErrors,
];

const validateReviewCreate = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .custom((value) => value <= 5 && value >= 1)
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateSpotCreate,
  validateGetAllSpotsQueries,
  validateReviewCreate,
  validateSignup,
  validateLogin
};
