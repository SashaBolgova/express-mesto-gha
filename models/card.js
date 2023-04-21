const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле название должно быть заполнено'],
    minLength: [2, 'Минимальное количество букв в названии - 2'],
    maxLength: [30, 'Минимальное количество букв в названии - 30'],
  },
  link: {
    type: String,
    required: [true, 'Добавьте URL карточки'],
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
      required: true
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);