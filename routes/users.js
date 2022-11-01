const express = require('express');

const usersRoute = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

usersRoute.get('/', getUsers);
usersRoute.get('/:userId', getUserById);
usersRoute.post('/', createUser);
usersRoute.patch('/me', updateUserInfo);
usersRoute.patch('/me/avatar', updateUserAvatar);

module.exports = { usersRoute };
