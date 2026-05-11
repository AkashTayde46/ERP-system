const express = require('express');
const router = express.Router();
const { createExam, getExams } = require('../Controller/examController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin', 'teacher'), createExam);
router.get('/', protect, getExams);

module.exports = router;
