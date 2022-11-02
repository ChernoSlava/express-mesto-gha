const NotFoundError = require('../errors/NotFoundError');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Ресурс не найден.'));
};
