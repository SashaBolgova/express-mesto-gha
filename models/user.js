const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const UnauthorizedError = require('../errors/unauthorized-err');

const urlRegExp = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?#?$/;

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
      validate: {
        validator: (avatar) => urlRegExp.test(avatar),
        message: 'Некорректный URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Поле email  должно быть заполнено'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Почта некорректна',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
  {
    toJSON: { useProjection: true }, toObject: { useProjection: true },
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  const isEmailValid = isEmail(email);
  if (!isEmailValid) {
    return Promise.reject(new Error('Неправильные почта или пароль'));
  }
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Данные пользователя не найдены'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Данные пользователя не найдены'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
