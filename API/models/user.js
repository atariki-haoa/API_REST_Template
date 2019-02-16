'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = schema({
  name: String,
  password: String,
  status: { type: schema.ObjectId, ref: 'Status' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
