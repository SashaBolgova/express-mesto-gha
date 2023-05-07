const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const user = require('../models/user');

const auth = (req, res, next) => {
  const token = jwt.sign({ _id: user._id }, 'secret');

  if (!token) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    throw new UnauthorizedError('Не существующий токен');
  }

  req.user = payload;

  next();
};

module.exports = { auth };
