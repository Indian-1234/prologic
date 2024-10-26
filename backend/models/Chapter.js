const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true },
  topics: [{
    title: String,
    description: String,
    content: String,
    attachments: [String]
  }]
});

module.exports = mongoose.model('Chapter', chapterSchema);