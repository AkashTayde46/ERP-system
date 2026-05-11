import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const ROLES = [
  {
    id: 'student',
    label: 'Student',
    icon: '🎓',
    desc: 'Access fees, grades & queries',
    color: '#4f8ef7',
    gradient: 'linear-gradient(135deg, #4f8ef7, #1a6ef5)',
  },
  {
    id: 'teacher',
    label: 'Teacher',
    icon: '👨‍🏫',
    desc: 'Manage classes & attendance',
    color: '#10d9a0',
    gradient: 'linear-gradient(135deg, #10d9a0, #059669)',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: '🛡️',
    desc: 'Full system administration',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  },
];

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    studentId: '', course: '', semester: '1',
    teacherId: '', department: '', subjects: '', designation: '',
    adminId: '', phone: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const currentRole = ROLES.find(r => r.id === selectedRole);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'register' && form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'login'
        ? { email: form.email, password: form.password, role: selectedRole }
        : { ...form, role: selectedRole };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        login(data.user, data.token);
        setSuccess(data.message);
        setTimeout(() => navigate(`/${data.user.role}-dashboard`), 800);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setError('');
    setSuccess('');
    setForm({ name: '', email: '', password: '', confirmPassword: '', studentId: '', course: '', semester: '1', teacherId: '', department: '', subjects: '', designation: '', adminId: '', phone: '' });
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left" style={{ '--role-color': currentRole.color, '--role-gradient': currentRole.gradient }}>
        <div className="auth-left-content">
          <div className="auth-brand">
            <div className="auth-brand-icon">🏛️</div>
            <div>
              <div className="auth-brand-name">EduERP</div>
              <div className="auth-brand-tagline">Enterprise Resource Portal</div>
            </div>
          </div>

          <div className="auth-hero">
            <h1 className="auth-hero-title">
              Smart Education<br />
              <span className="auth-hero-highlight">Management System</span>
            </h1>
            <p className="auth-hero-desc">
              A unified platform for students, teachers, and administrators to manage academics, fees, and operations efficiently.
            </p>
          </div>

          <div className="auth-features">
            {[
              { icon: '📊', text: 'Real-time fee & finance tracking' },
              { icon: '📚', text: 'Attendance & grade management' },
              { icon: '💬', text: 'Integrated query resolution system' },
              { icon: '🔒', text: 'Role-based secure access control' },
            ].map((f, i) => (
              <div key={i} className="auth-feature-item">
                <span className="auth-feature-icon">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Role Preview Cards */}
          <div className="auth-role-preview">
            {ROLES.map(r => (
              <div
                key={r.id}
                className={`auth-role-preview-card ${selectedRole === r.id ? 'active' : ''}`}
                style={{ '--card-color': r.color }}
                onClick={() => setSelectedRole(r.id)}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-container">
          {/* Header */}
          <div className="auth-form-header">
            <div className="auth-form-icon" style={{ background: currentRole.gradient }}>
              {currentRole.icon}
            </div>
            <div>
              <h2 className="auth-form-title">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="auth-form-subtitle">
                {mode === 'login' ? 'Sign in to your ERP account' : 'Join the ERP system today'}
              </p>
            </div>
          </div>

          {/* Role Selector */}
          <div className="role-selector">
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                className={`role-btn ${selectedRole === r.id ? 'active' : ''}`}
                style={{ '--role-col': r.color }}
                onClick={() => { setSelectedRole(r.id); setError(''); }}
              >
                <span className="role-btn-icon">{r.icon}</span>
                <span className="role-btn-label">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Alerts */}
          {error && <div className="alert alert-error">⚠️ {error}</div>}
          {success && <div className="alert alert-success">✅ {success}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="form-input-icon">
                    <span className="input-icon">👤</span>
                    <input className="form-input" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="form-input-icon">
                    <span className="input-icon">📞</span>
                    <input className="form-input" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-icon">
                <span className="input-icon">✉️</span>
                <input className="form-input" type="email" name="email" placeholder="you@institution.edu" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            {/* Role-specific register fields */}
            {mode === 'register' && selectedRole === 'student' && (
              <div className="role-fields animate-fade-in">
                <div className="role-fields-label" style={{ color: currentRole.color }}>🎓 Student Details</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Student ID</label>
                    <input className="form-input" name="studentId" placeholder="e.g. STU2024001" value={form.studentId} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Semester</label>
                    <select className="form-select" name="semester" value={form.semester} onChange={handleChange}>
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Course / Program</label>
                  <input className="form-input" name="course" placeholder="e.g. B.Tech Computer Science" value={form.course} onChange={handleChange} />
                </div>
              </div>
            )}

            {mode === 'register' && selectedRole === 'teacher' && (
              <div className="role-fields animate-fade-in">
                <div className="role-fields-label" style={{ color: currentRole.color }}>👨‍🏫 Teacher Details</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Teacher ID</label>
                    <input className="form-input" name="teacherId" placeholder="e.g. TCH2024001" value={form.teacherId} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input className="form-input" name="department" placeholder="e.g. Computer Science" value={form.department} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Subjects (comma separated)</label>
                    <input className="form-input" name="subjects" placeholder="e.g. Maths, Physics, DSA" value={form.subjects} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <select className="form-select" name="designation" value={form.designation} onChange={handleChange}>
                      <option value="">Select designation</option>
                      <option>Lecturer</option>
                      <option>Assistant Professor</option>
                      <option>Associate Professor</option>
                      <option>Professor</option>
                      <option>HOD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {mode === 'register' && selectedRole === 'admin' && (
              <div className="role-fields animate-fade-in">
                <div className="role-fields-label" style={{ color: currentRole.color }}>🛡️ Admin Details</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Admin ID</label>
                    <input className="form-input" name="adminId" placeholder="e.g. ADM2024001" value={form.adminId} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <select className="form-select" name="designation" value={form.designation} onChange={handleChange}>
                      <option value="">Select designation</option>
                      <option>System Administrator</option>
                      <option>Finance Manager</option>
                      <option>Principal</option>
                      <option>Registrar</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-icon">
                  <span className="input-icon">🔒</span>
                  <input className="form-input" type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required />
                </div>
              </div>
              {mode === 'register' && (
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div className="form-input-icon">
                    <span className="input-icon">🔒</span>
                    <input className="form-input" type="password" name="confirmPassword" placeholder="Re-enter password" value={form.confirmPassword} onChange={handleChange} required />
                  </div>
                </div>
              )}
            </div>

            <button
              id={`auth-submit-${mode}`}
              type="submit"
              className={`btn btn-${selectedRole} btn-full btn-lg`}
              disabled={loading}
            >
              {loading ? <><span className="spinner"></span> Processing...</> : (
                mode === 'login' ? `Sign In as ${currentRole.label}` : `Create ${currentRole.label} Account`
              )}
            </button>
          </form>

          <div className="auth-switch">
            <span>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>
            <button type="button" className="auth-switch-btn" onClick={switchMode} style={{ color: currentRole.color }}>
              {mode === 'login' ? 'Register Now' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
