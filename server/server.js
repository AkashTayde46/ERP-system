const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoutes');
const studentRoutes = require('./Routes/studentRoutes');
const teacherRoutes = require('./Routes/teacherRoutes');
const attendanceRoutes = require('./Routes/attendanceRoutes');
const feeRoutes = require('./Routes/feeRoutes');
const examRoutes = require('./Routes/examRoutes');
const resultRoutes = require('./Routes/resultRoutes');
const timetableRoutes = require('./Routes/timetableRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/erp_system';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/timetable', timetableRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ERP Server Running', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
