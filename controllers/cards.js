const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length >= 1) {
        res.send({ data: cards });
      } else {
        res.status(404).send({ message: 'Ни одной карточки не найдено!' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ message: 'Карточка удалена' });
      } else {
        res.status(404).send({ message: 'Карточка с таким _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.addLike = (req, res) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка с таким _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.removeLike = (req, res) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка с таким _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};
