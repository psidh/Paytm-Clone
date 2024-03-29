const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://philkhanasidharth14:1xd1BDZPkXSPBMGh@cluster0.gzhndhk.mongodb.net/paytm'
);

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
    type: String,
    required: true, // Specify that password is required
    minlength: 6, // Specify the minimum length of the password
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
