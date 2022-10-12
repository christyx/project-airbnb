const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
<<<<<<< HEAD
const { validateLogin } = require('../../utils/validation');
=======
const { check, cookie } = require('express-validator');
const { handleValidationErrors, validateLogin } = require('../../utils/validation');

>>>>>>> main
const router = express.Router();

router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.findOne({ where: { email: credential, hashedPassword: password } });
    if (!user) {
      res.status(401)
      return res.json({
        message: "Invalid credentials",
        statusCode: 401
      })
    }

    let token = await setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: credential,
      username: user.username,
      token
    });
  }
);

router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get(
  '/',
  requireAuth,
  (req, res, next) => {
    const { user } = req;
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    });
  }
);

module.exports = router;
