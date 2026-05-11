const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, trim: true, default: '' },
    className: { type: String, trim: true, default: '' },
    division: { type: String, trim: true, default: '' },
    parentName: { type: String, default: '' },
    parentPhone: { type: String, default: '' },
    parentEmail: { type: String, default: '' },
    address: { type: String, default: '' },
    documents: [{ name: String, url: String }],
    admissionDate: { type: Date },
    classTeacher: { type: String, default: '' },
    courses: [{ type: String }],
    admissionFee: { type: Number, default: 0 },
    transactionDates: [{ type: Date }],
    otherInfo: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
