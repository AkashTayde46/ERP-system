const Teacher = require('../Models/Teacher');

exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, teacher });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.json({ success: true, teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id });
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    res.json({ success: true, teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, teacher });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
