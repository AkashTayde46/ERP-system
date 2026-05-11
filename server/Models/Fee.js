const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    title: { type: String, default: '' },
    amount: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    amountDue: { type: Number, default: 0 },
    status: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
    dueDate: { type: Date },
    paidDate: { type: Date },
    receiptNo: { type: String, default: '' },
    method: { type: String, default: '' },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fee', feeSchema);
