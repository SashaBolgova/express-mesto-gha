const express = require('express');

const cardRouter = express.Router();

const { errors } = require('celebrate');

const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCardCreate, validateCardId,
} = require('../middlewares/validation');

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', validateCardId, deleteCard);

cardRouter.post('/cards', validateCardCreate, createCard);

cardRouter.put('/cards/:cardId/likes', validateCardId, likeCard);

cardRouter.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

cardRouter.use(errors());

module.exports = { cardRouter };
