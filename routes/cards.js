const express = require('express');

const cardRouter = express.Router();

const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCardCreate, validateCardId,
} = require('../middlewares/validation');

const auth = require('../middlewares/auth');

cardRouter.get('/cards', auth, getCards);

cardRouter.delete('/cards/:cardId', auth, validateCardId, deleteCard);

cardRouter.post('/cards', auth, validateCardCreate, createCard);

cardRouter.put('/cards/:cardId/likes', auth, validateCardId, likeCard);

cardRouter.delete('/cards/:cardId/likes', auth, validateCardId, dislikeCard);

module.exports = { cardRouter };
