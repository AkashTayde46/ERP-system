const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, 'Password is required'], minlength: 6 },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin', 'accountant'],
      required: [true, 'Role is required'],
    },

    // Student-specific fields
    studentId: { type: String, default: '' },
    course: { type: String, default: '' },
    semester: { type: Number, default: 1 },
    feeStatus: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
    feeDue: { type: Number, default: 0 },
    feePaid: { type: Number, default: 0 },

    // Teacher-specific fields
    teacherId: { type: String, default: '' },
    department: { type: String, default: '' },
    subjects: [{ type: String }],
    designation: { type: String, default: '' },

    // Admin-specific fields
    adminId: { type: String, default: '' },
    designation_admin: { type: String, default: '' },

    // Accountant-specific fields
    accountantId: { type: String, default: '' },
    designation_accountant: { type: String, default: '' },

    // Common
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    profilePic: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
