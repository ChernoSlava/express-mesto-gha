const express = require('express');

const cardsRoute = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

cardsRoute.get('/', getCards);
cardsRoute.post('/', createCard);
cardsRoute.delete('/:cardId', deleteCard);
cardsRoute.put('/:cardId/likes', addLike);
cardsRoute.delete('/:cardId/likes', removeLike);

module.exports = { cardsRoute };
