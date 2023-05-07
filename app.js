const express = require('express');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const {
  createUser, login,
} = require('./controllers/users');
const {
  validateSignup, validateSignIn,
} = require('./middlewares/validation');

const { auth } = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-err');

// Слушаем 3000 порт
const { PORT = 3000, LOCALHOST = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(LOCALHOST, {
  useNewUrlParser: true,
});

userRouter.post('/signin', validateSignIn, login);
userRouter.post('/signup', validateSignup, createUser);

app.use(errors());

app.use(auth, userRouter);
app.use(userRouter);
app.use(auth, cardRouter);

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});