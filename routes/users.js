const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRoute = express.Router();

const { validUrlLink } = require('../middlewares/regularExpression');
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRoute.get('/', getUsers);

usersRoute.get('/me', getCurrentUser);

usersRoute.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);

usersRoute.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserInfo,
);

usersRoute.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(validUrlLink, 'URL'),
    }),
  }),
  updateUserAvatar,
);

module.exports = { usersRoute };
