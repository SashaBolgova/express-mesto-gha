const express = require('express');

const userRouter = express.Router();

const {
  getUsers, getUser, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

const {
  validateUserId, validateUserUpdate, validateAvatarUpdate,
} = require('../middlewares/validation');

const auth = require('../middlewares/auth');

userRouter.get('/users', auth, getUsers);

userRouter.get('/users/me', auth, getUserInfo);

userRouter.get('/users/:userId', auth, validateUserId, getUser);

userRouter.patch('/users/me', auth, validateUserUpdate, updateUser);

userRouter.patch('/users/me/avatar', auth, validateAvatarUpdate, updateAvatar);

module.exports = { userRouter };
