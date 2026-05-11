const Fee = require('../Models/Fee');
const Student = require('../Models/Student');

exports.createFee = async (req, res) => {
  try {
    const amountPaid = req.body.amountPaid || 0;
    const amountDue = Math.max((req.body.amount || 0) - amountPaid, 0);

    const fee = await Fee.create({
      ...req.body,
      amountPaid,
      amountDue,
      status: amountDue === 0 ? 'paid' : amountPaid > 0 ? 'partial' : 'pending',
    });

    res.status(201).json({ success: true, fee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getFees = async (req, res) => {
  try {
    const { studentId, status } = req.query;
    const filter = {};
    if (studentId) filter.student = studentId;
    if (status) filter.status = status;

    const fees = await Fee.find(filter).populate('student', 'name rollNumber className division');
    res.json({ success: true, fees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyFees = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const fees = await Fee.find({ student: student._id }).populate('student', 'name rollNumber');
    res.json({ success: true, fees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ success: false, message: 'Fee record not found' });

    const payment = Number(req.body.amountPaid || 0);
    fee.amountPaid = fee.amountPaid + payment;
    fee.amountDue = Math.max(fee.amount - fee.amountPaid, 0);
    fee.status = fee.amountDue === 0 ? 'paid' : fee.amountPaid > 0 ? 'partial' : 'pending';
    fee.paidDate = req.body.paidDate || fee.paidDate;
    fee.receiptNo = req.body.receiptNo || fee.receiptNo;
    fee.method = req.body.method || fee.method;
    fee.remarks = req.body.remarks || fee.remarks;

    await fee.save();
    res.json({ success: true, fee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
