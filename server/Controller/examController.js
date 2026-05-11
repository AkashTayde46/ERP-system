const Exam = require('../Models/Exam');

exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const { className, division } = req.query;
    const filter = {};
    if (className) filter.className = className;
    if (division) filter.division = division;

    const exams = await Exam.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, exams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
