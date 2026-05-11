const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  getMyStudentProfile,
  updateStudent,
  deleteStudent,
} = require('../Controller/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin'), createStudent);
router.get('/', protect, authorize('admin', 'teacher'), getStudents);
router.get('/me', protect, authorize('student'), getMyStudentProfile);
router.get('/:id', protect, authorize('admin', 'teacher'), getStudentById);
router.patch('/:id', protect, authorize('admin'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

module.exports = router;
