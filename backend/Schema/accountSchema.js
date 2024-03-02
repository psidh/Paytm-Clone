const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://philkhanasidharth14:1xd1BDZPkXSPBMGh@cluster0.gzhndhk.mongodb.net/paytm'
);
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
  Account,
};
