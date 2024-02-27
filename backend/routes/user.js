const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { JWT_SECRET } = require('../config');
const { User } = require('../Schema/userSchema');
const signUpBody = require('../middleware/signUpMiddleware');
const signInBody = require('../middleware/signInMiddleware');
const rootRouter = require('./index');

rootRouter.post('/signup', async (req, res) => {
  const { success } = signUpBody.safeParse(req.body);

  if (!success) {
    return res.status(401).json({
      message: 'Email already taken / Incorrect inputs',
    });
  }

  const existingUser = User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(401).json({
      message: 'User already exists',
    });
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign(userId, JWT_SECRET);

  return res.json({
    message: 'User created successfully',
    token: token,
  });
});

app.post('/signin', async (req, res) => {
  const { success } = signInBody.safeParse(req.body);

  if (!success) {
    res.status(401).json({
      message: 'Email/ Password incorrect',
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token: token });
    return;
  }

  res.status(411).json({
    message: 'Error while logging in',
  });
});

module.exports = userRouter;
