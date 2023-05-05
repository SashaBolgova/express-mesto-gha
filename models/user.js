const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minLength: [2, 'Минимальное количество букв в имени - 2'],
      maxLength: [30, 'Минимальное количество букв в имени - 30'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minLength: [2, 'Минимальное количество букв в описании - 2'],
      maxLength: [30, 'Минимальное количество букв в описании - 30'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: [isURL, 'Поле "avatar" неверно заполнено'],
    },
    email: {
      type: String,
      required: [true, 'Поле email  должно быть заполнено'],
      unique: true,
      validate: [isEmail, 'Поле "email" неверно заполнено'],
    },
    password: {
      type: String,
      required: [true, 'Поле пароль должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Данные пользователя не найдены');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Данные пользователя не найдены');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
