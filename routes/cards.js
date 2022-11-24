const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardsRoute = express.Router();

const { validUrlLink } = require('../middlewares/regularExpression');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

cardsRoute.get('/', getCards);

cardsRoute.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(validUrlLink, 'URL'),
    }),
  }),
  createCard,
);

cardsRoute.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCard,
);

cardsRoute.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  addLike,
);

cardsRoute.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  removeLike,
);

module.exports = { cardsRoute };
