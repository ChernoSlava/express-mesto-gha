const express = require('express');
const mongoose = require('mongoose');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');
const { notFoundRoute } = require('./routes/notFound');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '636020ab1015d652088fa22b',
  };

  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use('*', notFoundRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
