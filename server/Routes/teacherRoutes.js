const express = require('express');
const router = express.Router();
const {
  createTeacher,
  getTeachers,
  getTeacherById,
  getMyTeacherProfile,
  updateTeacher,
  deleteTeacher,
} = require('../Controller/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin'), createTeacher);
router.get('/', protect, authorize('admin', 'teacher'), getTeachers);
router.get('/me', protect, authorize('teacher'), getMyTeacherProfile);
router.get('/:id', protect, authorize('admin', 'teacher'), getTeacherById);
router.patch('/:id', protect, authorize('admin'), updateTeacher);
router.delete('/:id', protect, authorize('admin'), deleteTeacher);

module.exports = router;
