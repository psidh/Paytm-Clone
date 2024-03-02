const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require('../Schema/userSchema');
const z = require('zod');
const { Account } = require('../Schema/accountSchema');

//___________ZOD MIDDLEWARE____________________________________________

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const signInBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

//____________________________________________________________________

router.post('/signup', async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs',
    });
  }

  console.log(success);
  console.log(req.body);

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: 'Email already taken/Incorrect inputs',
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;
  console.log(userId);

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: 'User created successfully',
    token: token,
  });
});

// ------------------------------------------------------------------

router.post('/signin', async (req, res) => {
  console.log(JWT_SECRET);
  const { success } = signInBody.safeParse(req.body);

  if (!success) {
    return res.status(401).json({
      message: 'Email/ Password incorrect',
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.json({ token: token });
  }

  return res.status(401).json({
    message: 'Error while logging in',
  });
});

// ------------------------------------------------------------------

router.put('/', async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: 'Error while updating information',
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: 'Updated successfully',
  });
});

router.get('/bulk', async (req, res) => {
  const filter = req.query.filter || '';

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
