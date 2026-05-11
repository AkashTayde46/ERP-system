const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    marks: [
      {
        subject: { type: String, required: true },
        marks: { type: Number, required: true },
        maxMarks: { type: Number, required: true },
      },
    ],
    total: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    grade: { type: String, default: '' },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
