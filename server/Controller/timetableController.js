const Timetable = require('../Models/Timetable');
const Student = require('../Models/Student');

exports.upsertTimetable = async (req, res) => {
  try {
    const { className, division } = req.body;
    const timetable = await Timetable.findOneAndUpdate(
      { className, division },
      { ...req.body, updatedBy: req.user.id },
      { new: true, upsert: true }
    );

    res.json({ success: true, timetable });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getTimetable = async (req, res) => {
  try {
    const { className, division } = req.query;
    const filter = {};
    if (className) filter.className = className;
    if (division) filter.division = division;

    const timetable = await Timetable.find(filter).sort({ updatedAt: -1 });
    res.json({ success: true, timetable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyTimetable = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const timetable = await Timetable.find({ className: student.className, division: student.division });
    res.json({ success: true, timetable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
