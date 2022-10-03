const express = require('express');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup } = require('../../utils/validation');
const router = express.Router();

router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;

    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
      res.status(403)
      return res.json({
        message: "User already exists",
        statusCode: 403,
        errors: "User with that email already exists"
      })
    }

    const existUsername = await User.findOne({ where: { username } });
    if (existUsername) {
      res.status(403)
      return res.json({
        message: "User already exists",
        statusCode: 403,
        errors: "User with that username already exists"
      })
    }

    const user = await User.create({ firstName, lastName, email, username, hashedPassword: password });
    let token = await setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName,
      lastName,
      email,
      username,
      token
    });
  }
);

module.exports = router;
