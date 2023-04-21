const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send('Переданы некорректные данные');
      } else {
        res.status(500).send('Произошла ошибка');
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
  .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send('Произошла ошибка'));
};

module.exports.deleteCard = (req, res) => {
  Card.findById({ _id: req.params.cardId })
  .orFail(() => {
    throw new Error('Карточка не найдена');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Переданы некорректные данные');
      } else if (err.message === 'Карточка не найдена') {
        res.status(404).send('Карточка не найдена');
      } else {
        res.status(500).send('Произошла ошибка');
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => {
    throw new Error('Карточка не найдена');
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Переданы некорректные данные');
      } else {
        res.status(500).send('Произошла ошибка');
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => {
    throw new Error('Карточка не найдена');
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Переданы некорректные данные');
      }else {
        res.status(500).send('Произошла ошибка');
      }
    });
};