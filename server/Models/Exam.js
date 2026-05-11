const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    division: { type: String, required: true, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    subjects: [
      {
        name: { type: String, required: true },
        maxMarks: { type: Number, default: 100 },
        date: { type: Date },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', examSchema);
