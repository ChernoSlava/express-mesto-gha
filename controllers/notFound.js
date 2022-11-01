module.exports.notFound = (req, res) => {
  res.status(418).send({ message: ':D I am a teapot! :D' });
};
