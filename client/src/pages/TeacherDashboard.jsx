import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TeacherDashboard.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'classes', label: 'My Classes', icon: '🏫' },
  { id: 'students', label: 'Students', icon: '🎓' },
  { id: 'attendance', label: 'Mark Attendance', icon: '📅' },
  { id: 'grades', label: 'Upload Grades', icon: '📝' },
  { id: 'queries', label: 'Student Queries', icon: '💬' },
];

const SAMPLE_CLASSES = [
  { id: 'CS301', name: 'Data Structures & Algorithms', section: 'A', students: 58, schedule: 'Mon, Wed 9AM', room: 'LH-101' },
  { id: 'CS302', name: 'Operating Systems', section: 'B', students: 52, schedule: 'Tue, Thu 9AM', room: 'LH-203' },
  { id: 'CS303', name: 'Database Management', section: 'A', students: 60, schedule: 'Mon, Fri 2PM', room: 'Lab-102' },
];

const SAMPLE_STUDENTS = [
  { id: 'STU001', name: 'Aryan Sharma', course: 'B.Tech CS', semester: 3, attendance: 94, cgpa: 9.2, fees: 'paid' },
  { id: 'STU002', name: 'Priya Patel', course: 'B.Tech CS', semester: 3, attendance: 87, cgpa: 8.8, fees: 'paid' },
  { id: 'STU003', name: 'Rahul Verma', course: 'B.Tech CS', semester: 3, attendance: 72, cgpa: 7.5, fees: 'pending' },
  { id: 'STU004', name: 'Sneha Gupta', course: 'B.Tech CS', semester: 3, attendance: 96, cgpa: 9.6, fees: 'paid' },
  { id: 'STU005', name: 'Karan Singh', course: 'B.Tech CS', semester: 3, attendance: 68, cgpa: 7.1, fees: 'partial' },
];

const SAMPLE_ATTENDANCE_DATA = [
  { name: 'Aryan Sharma', roll: 'STU001', present: true },
  { name: 'Priya Patel', roll: 'STU002', present: true },
  { name: 'Rahul Verma', roll: 'STU003', present: false },
  { name: 'Sneha Gupta', roll: 'STU004', present: true },
  { name: 'Karan Singh', roll: 'STU005', present: false },
];

const STUDENT_QUERIES = [
  { id: 'Q-001', student: 'Rahul Verma', roll: 'STU003', subject: 'Attendance Discrepancy in CS301', date: '2024-11-10', status: 'pending' },
  { id: 'Q-002', student: 'Karan Singh', roll: 'STU005', subject: 'Request for Grade Re-evaluation', date: '2024-11-08', status: 'in-progress' },
  { id: 'Q-003', student: 'Priya Patel', roll: 'STU002', subject: 'Lab Material Request', date: '2024-11-05', status: 'resolved' },
];

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [attendance, setAttendance] = useState(SAMPLE_ATTENDANCE_DATA);
  const [queries, setQueries] = useState(STUDENT_QUERIES);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const toggleAttendance = (roll) => {
    setAttendance(prev => prev.map(s => s.roll === roll ? { ...s, present: !s.present } : s));
  };

  const resolveQuery = (id) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, status: 'resolved' } : q));
  };

  const presentCount = attendance.filter(s => s.present).length;
  const totalStudents = SAMPLE_STUDENTS.length;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar teacher-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{ background: 'linear-gradient(135deg, #10d9a0, #059669)' }}>👨‍🏫</div>
          <div>
            <div className="sidebar-logo-text">EduERP</div>
            <div className="sidebar-logo-sub">Teacher Portal</div>
          </div>
        </div>

        <span className="sidebar-section-label">Navigation</span>
        <ul className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <li key={item.id} className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}>
              <button
                id={`teacher-nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                style={activeSection === item.id ? { background: 'rgba(16,217,160,0.12)', color: '#10d9a0' } : {}}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar" style={{ background: 'linear-gradient(135deg, #10d9a0, #059669)' }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'T'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'Teacher'}</div>
              <div className="sidebar-user-role">{user?.designation || 'Faculty'} • {user?.department || 'CS Dept'}</div>
            </div>
          </div>
          <button id="teacher-logout" className="btn btn-outline btn-full" style={{ marginTop: 10, fontSize: '0.85rem' }} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Welcome, {user?.name?.split(' ')[0] || 'Professor'}! 👋</h1>
              <p className="dashboard-subtitle">Faculty dashboard — {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="stats-grid">
              {[
                { icon: '🏫', label: 'Classes Assigned', value: SAMPLE_CLASSES.length, change: 'This semester', color: '#10d9a0' },
                { icon: '🎓', label: 'Total Students', value: totalStudents, change: 'Across all sections', color: '#4f8ef7' },
                { icon: '📅', label: "Today's Attendance", value: `${presentCount}/${attendance.length}`, change: `${Math.round(presentCount/attendance.length*100)}% present`, color: '#f59e0b' },
                { icon: '💬', label: 'Pending Queries', value: queries.filter(q => q.status === 'pending').length, change: 'Needs response', color: '#ef4444' },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.color, borderRadius: '20px 20px 0 0' }}></div>
                  <div className="stat-card-icon">{s.icon}</div>
                  <div className="stat-card-value">{s.value}</div>
                  <div className="stat-card-label">{s.label}</div>
                  <div className="stat-card-change" style={{ color: s.color }}>{s.change}</div>
                </div>
              ))}
            </div>

            <div className="content-section">
              <div className="section-title" style={{ marginBottom: 16 }}>📋 Your Profile</div>
              <div className="card-grid">
                {[
                  { label: 'Teacher ID', value: user?.teacherId || 'TCH2024001', icon: '🆔' },
                  { label: 'Department', value: user?.department || 'Computer Science', icon: '🏛️' },
                  { label: 'Designation', value: user?.designation || 'Assistant Professor', icon: '📌' },
                  { label: 'Email', value: user?.email || 'teacher@edu.in', icon: '✉️' },
                ].map((item, i) => (
                  <div key={i} className="info-card" style={{ borderLeft: '3px solid #10d9a0' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CLASSES */}
        {activeSection === 'classes' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">🏫 My Classes</h1>
              <p className="dashboard-subtitle">All assigned classes this semester</p>
            </div>
            <div className="card-grid">
              {SAMPLE_CLASSES.map(cls => (
                <div key={cls.id} className="info-card" style={{ borderTop: '3px solid #10d9a0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <span className="badge badge-green">{cls.id}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Section {cls.section}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12, color: 'var(--text-primary)' }}>{cls.name}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <span>👥 {cls.students} Students</span>
                    <span>🏛️ {cls.room}</span>
                    <span>📅 {cls.schedule}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {activeSection === 'students' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">🎓 Students</h1>
              <p className="dashboard-subtitle">Your enrolled students at a glance</p>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr><th>Student ID</th><th>Name</th><th>Course</th><th>Semester</th><th>Attendance</th><th>CGPA</th><th>Fee Status</th></tr>
                </thead>
                <tbody>
                  {SAMPLE_STUDENTS.map(s => (
                    <tr key={s.id}>
                      <td><code style={{ color: '#10d9a0', fontSize: '0.85rem' }}>{s.id}</code></td>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{s.course}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>Sem {s.semester}</td>
                      <td>
                        <span style={{ color: s.attendance >= 75 ? '#10d9a0' : '#ef4444', fontWeight: 600 }}>{s.attendance}%</span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{s.cgpa}</td>
                      <td><span className={`badge ${s.fees === 'paid' ? 'badge-green' : s.fees === 'partial' ? 'badge-orange' : 'badge-red'}`}>{s.fees}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ATTENDANCE */}
        {activeSection === 'attendance' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">📅 Mark Attendance</h1>
              <p className="dashboard-subtitle">CS301 — {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="info-card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ color: '#10d9a0', fontWeight: 600 }}>✅ Present: {attendance.filter(s => s.present).length}</div>
                <div style={{ color: '#ef4444', fontWeight: 600 }}>❌ Absent: {attendance.filter(s => !s.present).length}</div>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>Roll No.</th><th>Name</th><th>Status</th><th>Toggle</th></tr></thead>
                <tbody>
                  {attendance.map(s => (
                    <tr key={s.roll}>
                      <td><code style={{ color: '#10d9a0', fontSize: '0.85rem' }}>{s.roll}</code></td>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td>
                        <span className={`badge ${s.present ? 'badge-green' : 'badge-red'}`}>
                          {s.present ? '✅ Present' : '❌ Absent'}
                        </span>
                      </td>
                      <td>
                        <button
                          id={`toggle-attendance-${s.roll}`}
                          className={`btn ${s.present ? 'btn-outline' : 'btn-teacher'}`}
                          style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                          onClick={() => toggleAttendance(s.roll)}
                        >
                          {s.present ? 'Mark Absent' : 'Mark Present'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button id="save-attendance" className="btn btn-teacher" style={{ marginTop: 16 }}>💾 Save Attendance</button>
          </div>
        )}

        {/* GRADES */}
        {activeSection === 'grades' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">📝 Upload Grades</h1>
              <p className="dashboard-subtitle">Enter marks for your subjects</p>
            </div>
            <div className="info-card">
              <div className="section-title" style={{ marginBottom: 20 }}>CS301 — Mid-Term Marks</div>
              <div className="table-container" style={{ marginBottom: 0, border: 'none' }}>
                <table>
                  <thead><tr><th>Student</th><th>Roll No</th><th>Marks (out of 50)</th></tr></thead>
                  <tbody>
                    {SAMPLE_STUDENTS.map(s => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 500 }}>{s.name}</td>
                        <td><code style={{ color: '#10d9a0', fontSize: '0.85rem' }}>{s.id}</code></td>
                        <td>
                          <input
                            id={`grade-${s.id}`}
                            className="form-input"
                            type="number"
                            min="0"
                            max="50"
                            placeholder="Enter marks"
                            style={{ width: 120 }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button id="upload-grades" className="btn btn-teacher" style={{ marginTop: 16 }}>📤 Upload Grades</button>
            </div>
          </div>
        )}

        {/* QUERIES */}
        {activeSection === 'queries' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">💬 Student Queries</h1>
              <p className="dashboard-subtitle">Queries raised by your students</p>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>Query ID</th><th>Student</th><th>Subject</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {queries.map(q => (
                    <tr key={q.id}>
                      <td><code style={{ color: '#10d9a0', fontSize: '0.85rem' }}>{q.id}</code></td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{q.student}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{q.roll}</div>
                      </td>
                      <td style={{ fontSize: '0.88rem' }}>{q.subject}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{q.date}</td>
                      <td><span className={`badge ${q.status === 'resolved' ? 'badge-green' : q.status === 'in-progress' ? 'badge-blue' : 'badge-orange'}`}>{q.status}</span></td>
                      <td>
                        {q.status !== 'resolved' && (
                          <button
                            id={`resolve-${q.id}`}
                            className="btn btn-teacher"
                            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                            onClick={() => resolveQuery(q.id)}
                          >
                            ✅ Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
