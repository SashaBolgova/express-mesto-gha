const mongoose = require('mongoose');

const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле название должно быть заполнено'],
      minLength: [2, 'Минимальное количество букв в названии - 2'],
      maxLength: [30, 'Минимальное количество букв в названии - 30'],
    },
    link: {
      type: String,
      required: [true, 'Добавьте URL карточки'],
      validate: {
        validator: (link) => urlRegExp.test(link),
        message: 'Неверный url изображения.',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('card', cardSchema);
