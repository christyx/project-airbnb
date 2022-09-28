const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
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
  handleValidationErrors
];


router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;

    const existEmail = await User.findOne({where: {email}});
    if (existEmail) {
      const err = new Error('Email failed');
      err.status = 403;
      err.title = "User email already exists";
      err.errors = [ "User email already exists" ];
      return next(err);
    }

    const existUsername = await User.findOne({where: {username}});
    if (existUsername) {
      const errUsername = new Error('Username failed');
      errUsername.status = 403;
      errUsername.title = "Username already exists";
      errUsername.errors = [ "Username already exists" ];
      return next(errUsername);
    }

    const user = await User.create({ firstName, lastName, email, username, hashedPassword: password });


    let token = await setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName,
      lastName,
      email,
      token
    });
  }
);


module.exports = router;
