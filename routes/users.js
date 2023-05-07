const express = require('express');

const userRouter = express.Router();

const { errors } = require('celebrate');

const {
  getUsers, getUser, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

const {
  validateUserId, validateUserUpdate, validateAvatarUpdate,
} = require('../middlewares/validation');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUserInfo);

userRouter.get('/users/:userId', validateUserId, getUser);

userRouter.patch('/users/me', validateUserUpdate, updateUser);

userRouter.patch('/users/me/avatar', validateAvatarUpdate, updateAvatar);

userRouter.use(errors());

module.exports = { userRouter };
