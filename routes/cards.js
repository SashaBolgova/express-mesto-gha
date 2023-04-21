const express = require('express');
const cardRouter = express.Router();

const { getCards, deleteCard, createCard, likeCard, dislikeCard } = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.post('/cards', createCard);

cardRouter.put('/cards/:cardId/likes', likeCard);

cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = { cardRouter };
