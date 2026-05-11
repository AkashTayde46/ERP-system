const express = require('express');
const router = express.Router();
const { upsertTimetable, getTimetable, getMyTimetable } = require('../Controller/timetableController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.put('/', protect, authorize('admin'), upsertTimetable);
router.get('/', protect, getTimetable);
router.get('/me', protect, authorize('student'), getMyTimetable);

module.exports = router;
