const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://philkhanasidharth14:1xd1BDZPkXSPBMGh@cluster0.gzhndhk.mongodb.net/paytm');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    required: true,
    type: String,
    minLength: 6,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
