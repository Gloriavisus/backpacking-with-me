'user strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hobbies: {
    type: Array,
    default: []
  },
  image: String,
  description: {
    type: String,
    default: ''
  },
  trips: [{
    type: ObjectId,
    ref: 'Trip'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
