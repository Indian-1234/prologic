const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
//   level: { type: String, required: true },
level: { type: String},

  coverImage: String,
  salesVideo: String,
  faqs: [{
    question: String,
    answer: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);