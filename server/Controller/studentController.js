const Student = require('../Models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { className, division } = req.query;
    const filter = {};
    if (className) filter.className = className;
    if (division) filter.division = division;

    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
