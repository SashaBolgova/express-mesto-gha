const express = require('express');

const userRouter = express.Router();

const {
  getUsers, getUser, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

const {
  validateUserId, validateUserUpdate, validateAvatarUpdate,
} = require('../middlewares/validation');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', validateUserId, getUser);

userRouter.get('/users/me', getUserInfo);

userRouter.patch('/users/me', validateUserUpdate, updateUser);

userRouter.patch('/users/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = { userRouter };
