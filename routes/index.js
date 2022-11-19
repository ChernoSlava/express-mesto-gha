const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { usersRoute } = require('./users');
const { cardsRoute } = require('./cards');
const { notFoundRoute } = require('./notFound');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validUrlLink } = require('../middlewares/regularExpression');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(validUrlLink, 'URL'),
    }),
  }),
  createUser,
);

router.use(auth);

router.use('/users', usersRoute);
router.use('/cards', cardsRoute);

router.use('*', notFoundRoute);

module.exports = router;
