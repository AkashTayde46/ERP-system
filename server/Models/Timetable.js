const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema(
  {
    className: { type: String, required: true, trim: true },
    division: { type: String, required: true, trim: true },
    entries: [
      {
        day: { type: String, required: true },
        period: { type: String, required: true },
        subject: { type: String, required: true },
        teacherName: { type: String, default: '' },
        room: { type: String, default: '' },
      },
    ],
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

timetableSchema.index({ className: 1, division: 1 }, { unique: true });

module.exports = mongoose.model('Timetable', timetableSchema);
