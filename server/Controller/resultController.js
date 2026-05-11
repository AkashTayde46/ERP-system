const Result = require('../Models/Result');
const Student = require('../Models/Student');

exports.createResult = async (req, res) => {
  try {
    const { marks } = req.body;
    const total = (marks || []).reduce((sum, m) => sum + Number(m.marks || 0), 0);
    const maxTotal = (marks || []).reduce((sum, m) => sum + Number(m.maxMarks || 0), 0);
    const percentage = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;

    const result = await Result.create({
      ...req.body,
      total,
      percentage,
      publishedBy: req.user.id,
    });

    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const { studentId, examId } = req.query;
    const filter = {};
    if (studentId) filter.student = studentId;
    if (examId) filter.exam = examId;

    const results = await Result.find(filter)
      .populate('student', 'name rollNumber className division')
      .populate('exam', 'name');

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyResults = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const results = await Result.find({ student: student._id })
      .populate('exam', 'name');

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
