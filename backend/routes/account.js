const express = require('express');
const router = express.Router();
const { Account } = require('../Schema/accountSchema');
const { middleware } = require('../middleware');
const mongoose = require('mongoose');

router.get("/balance", middleware, async (req, res) => {
  const account = await Account.findOne({
      userId: req.userId
  });
  res.json({
      balance: account.balance
  })
});

router.post('/transfer', middleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  console.log(account);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Insufficient balance',
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    res.status(401).json({
      message: 'Invalid account',
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: +amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: 'Transfer successful',
  });
});

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUzMTBhMWYxNjk4NmYzM2MxODUwZjkiLCJpYXQiOjE3MDkzNzk3NDZ9.cLpD5U9HgzQ5APuxcLPCOJOSbi3Ee4-uHt5ASyLiz9s
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUzMTBjYWYxNjk4NmYzM2MxODUwZmUiLCJpYXQiOjE3MDkzNzk3ODd9.SRuCkFOCCBIS4KqQ4E9gVHBVnhl86B2NY5VCi2GhIB0
