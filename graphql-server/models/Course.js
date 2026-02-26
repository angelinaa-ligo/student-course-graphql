const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  section: String,
  semester: String,
   program: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);