const Attendance = require('../Models/Attendance');
const Student = require('../Models/Student');

exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      ...req.body,
      markedBy: req.user.id,
    });
    res.status(201).json({ success: true, attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { className, division, date, subject } = req.query;
    const filter = {};
    if (className) filter.className = className;
    if (division) filter.division = division;
    if (subject) filter.subject = subject;
    if (date) filter.date = new Date(date);

    const records = await Attendance.find(filter)
      .populate('entries.student', 'name rollNumber')
      .sort({ date: -1 });

    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const records = await Attendance.find({ 'entries.student': student._id })
      .populate('entries.student', 'name rollNumber')
      .sort({ date: -1 });

    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
