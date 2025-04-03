const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['forum', 'petition', 'issue'], required: true },
  options: { type: [String], required: true, minlength: 2 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', pollSchema);