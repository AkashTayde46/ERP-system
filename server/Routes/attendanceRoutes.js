const express = require('express');
const router = express.Router();
const { createAttendance, getAttendance, getMyAttendance } = require('../Controller/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin', 'teacher'), createAttendance);
router.get('/', protect, authorize('admin', 'teacher'), getAttendance);
router.get('/me', protect, authorize('student'), getMyAttendance);

module.exports = router;
