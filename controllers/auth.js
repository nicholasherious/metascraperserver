const mongoose = require('mongoose');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  console.log(req.user);

  res.send(req.user);
};

const getUserProfile = async (req, res) => {
  const getUserId = req.params.id;
  const findUser = await Users.findById(getUserId);
  res.send(findUser);
};

const login = async (req, res) => {
  console.log('logged in');
  req.logIn(user, () => {});
};

const register = async (req, res) => {
  const username = req.body.username;

  try {
    const checkUser = await Users.findOne({ username: username });
    if (checkUser) {
      res.send('User already exists');
    }
    if (!checkUser) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new Users({
        username: username,
        password: hashedPass,
        email: req.body.email,
      });
      await newUser.save();
      res.send('User Created');
    }
  } catch (error) {
    console.log(error);
    res.send({ Message: error.message });
  }
};

module.exports = { login, register, getUser, getUserProfile };
