const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    education: { type: String, default: '' },
    joiningDate: { type: Date },
    allocatedClass: { type: String, default: '' },
    designation: { type: String, default: '' },
    subject: { type: String, default: '' },
    salary: { type: Number, default: 0 },
    payrollDate: { type: Date },
    otherInfo: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
