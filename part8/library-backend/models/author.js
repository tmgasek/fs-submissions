/*
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
*/

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  born: Number,
});

module.exports = mongoose.model('Author', schema);
