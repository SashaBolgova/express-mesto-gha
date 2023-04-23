const express = require('express');
const userRouter = express.Router();

const { getUsers, getUserId, createUser, updateUser, updateAvatar } = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserId);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', updateUser);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = { userRouter };
