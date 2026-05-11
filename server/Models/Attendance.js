const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    className: { type: String, required: true, trim: true },
    division: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    entries: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        status: { type: String, enum: ['present', 'absent'], required: true },
        remark: { type: String, default: '' },
      },
    ],
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

attendanceSchema.index({ className: 1, division: 1, subject: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
