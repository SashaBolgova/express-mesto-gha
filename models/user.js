const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле имени должно быть заполнено'],
    minLength: [2, 'Минимальное количество букв в имени - 2'],
    maxLength: [30, 'Минимальное количество букв в имени - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле описания должно быть заполнено'],
    minLength: [2, 'Минимальное количество букв в описании - 2'],
    maxLength: [30, 'Минимальное количество букв в описании - 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле аватара должно быть заполнено'],
  }
})

module.exports = mongoose.model('user', userSchema);