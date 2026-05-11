const express = require('express');
const router = express.Router();
const { createFee, getFees, getMyFees, recordPayment } = require('../Controller/feeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin', 'accountant'), createFee);
router.get('/', protect, authorize('admin', 'accountant'), getFees);
router.get('/me', protect, authorize('student'), getMyFees);
router.patch('/:id/pay', protect, authorize('admin', 'accountant'), recordPayment);

module.exports = router;
