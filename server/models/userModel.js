const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min: 7,
  },
  avatar: {
    id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    required: true,
    default: 'user',
  },
});

const Users = mongoose.model('User', userSchema);
module.exports = Users;
