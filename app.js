const express = require('express');
const mongoose = require('mongoose');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '636020ab1015d652088fa22b',
  };

  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
