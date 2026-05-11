const express = require('express');
const router = express.Router();
const { createResult, getResults, getMyResults } = require('../Controller/resultController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin', 'teacher'), createResult);
router.get('/', protect, authorize('admin', 'teacher'), getResults);
router.get('/me', protect, authorize('student'), getMyResults);

module.exports = router;
