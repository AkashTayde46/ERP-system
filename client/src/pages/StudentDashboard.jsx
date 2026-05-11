import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './StudentDashboard.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'fees', label: 'Fee Portal', icon: '💳' },
  { id: 'grades', label: 'Grades & Results', icon: '📝' },
  { id: 'attendance', label: 'Attendance', icon: '📅' },
  { id: 'schedule', label: 'Timetable', icon: '🗓️' },
  { id: 'queries', label: 'My Queries', icon: '💬' },
];

const SAMPLE_FEES = [
  { id: 'FEE-001', semester: 'Semester 1', amount: 45000, paid: 45000, due: 0, status: 'paid', date: '2024-01-15' },
  { id: 'FEE-002', semester: 'Semester 2', amount: 45000, paid: 20000, due: 25000, status: 'partial', date: '2024-07-10' },
  { id: 'FEE-003', semester: 'Semester 3', amount: 48000, paid: 0, due: 48000, status: 'pending', date: '-' },
];

const SAMPLE_GRADES = [
  { subject: 'Data Structures & Algorithms', code: 'CS301', credits: 4, grade: 'A+', marks: 95, maxMarks: 100 },
  { subject: 'Operating Systems', code: 'CS302', credits: 4, grade: 'A', marks: 88, maxMarks: 100 },
  { subject: 'Database Management', code: 'CS303', credits: 3, grade: 'A+', marks: 92, maxMarks: 100 },
  { subject: 'Computer Networks', code: 'CS304', credits: 3, grade: 'B+', marks: 79, maxMarks: 100 },
  { subject: 'Software Engineering', code: 'CS305', credits: 2, grade: 'A', marks: 85, maxMarks: 100 },
];

const SAMPLE_ATTENDANCE = [
  { subject: 'Data Structures', total: 40, present: 38, percentage: 95 },
  { subject: 'Operating Systems', total: 38, present: 32, percentage: 84 },
  { subject: 'Database Management', total: 35, present: 35, percentage: 100 },
  { subject: 'Computer Networks', total: 36, present: 28, percentage: 78 },
  { subject: 'Software Engineering', total: 30, present: 29, percentage: 97 },
];

const SAMPLE_TIMETABLE = [
  { day: 'Monday', slots: ['Data Structures (9AM)', 'OS Lab (11AM)', 'DBMS (2PM)'] },
  { day: 'Tuesday', slots: ['Computer Networks (9AM)', 'Software Engg (11AM)', 'Library (2PM)'] },
  { day: 'Wednesday', slots: ['Data Structures (9AM)', 'DBMS Lab (11AM)', 'Networks (2PM)'] },
  { day: 'Thursday', slots: ['OS (9AM)', 'Software Engg (11AM)', 'Tutorial (2PM)'] },
  { day: 'Friday', slots: ['DBMS (9AM)', 'Networks Lab (11AM)', 'Seminar (2PM)'] },
];

const SAMPLE_QUERIES = [
  { id: 'Q-001', subject: 'Fee Receipt Not Generated', date: '2024-11-10', status: 'resolved', reply: 'Receipt has been emailed to your registered email address.' },
  { id: 'Q-002', subject: 'Request for Grade Re-evaluation', date: '2024-11-05', status: 'pending', reply: '-' },
  { id: 'Q-003', subject: 'Attendance Discrepancy in Networks', date: '2024-10-28', status: 'in-progress', reply: 'Being reviewed by the faculty.' },
];

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [queryText, setQueryText] = useState('');
  const [querySubject, setQuerySubject] = useState('');
  const [queries, setQueries] = useState(SAMPLE_QUERIES);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!querySubject || !queryText) return;
    const newQ = {
      id: `Q-00${queries.length + 1}`,
      subject: querySubject,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      reply: '-',
    };
    setQueries(prev => [newQ, ...prev]);
    setQueryText('');
    setQuerySubject('');
  };

  const totalFees = SAMPLE_FEES.reduce((a, f) => a + f.amount, 0);
  const paidFees = SAMPLE_FEES.reduce((a, f) => a + f.paid, 0);
  const dueFees = totalFees - paidFees;
  const avgAttendance = Math.round(SAMPLE_ATTENDANCE.reduce((a, s) => a + s.percentage, 0) / SAMPLE_ATTENDANCE.length);
  const cgpa = '9.2';

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar student-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{ background: 'linear-gradient(135deg, #4f8ef7, #1a6ef5)' }}>🎓</div>
          <div>
            <div className="sidebar-logo-text">EduERP</div>
            <div className="sidebar-logo-sub">Student Portal</div>
          </div>
        </div>

        <span className="sidebar-section-label">Navigation</span>
        <ul className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <li key={item.id} className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}>
              <button
                id={`nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                style={activeSection === item.id ? { background: 'rgba(79,142,247,0.15)', color: '#4f8ef7' } : {}}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar" style={{ background: 'linear-gradient(135deg, #4f8ef7, #1a6ef5)' }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'Student'}</div>
              <div className="sidebar-user-role">Student • {user?.course?.split(' ')[0] || 'B.Tech'}</div>
            </div>
          </div>
          <button id="student-logout" className="btn btn-outline btn-full" style={{ marginTop: 10, fontSize: '0.85rem' }} onClick={handleLogout}>
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
              <h1 className="dashboard-title">Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋</h1>
              <p className="dashboard-subtitle">Here's your academic overview for {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="stats-grid">
              {[
                { icon: '💳', label: 'Total Fees Paid', value: `₹${paidFees.toLocaleString()}`, change: `₹${dueFees.toLocaleString()} pending`, changeColor: dueFees > 0 ? '#ef4444' : '#10d9a0', accent: '#4f8ef7' },
                { icon: '📊', label: 'CGPA', value: cgpa, change: 'Semester 3 • Top 5%', changeColor: '#10d9a0', accent: '#10d9a0' },
                { icon: '📅', label: 'Avg Attendance', value: `${avgAttendance}%`, change: avgAttendance >= 75 ? '✓ Good Standing' : '⚠ Low Attendance', changeColor: avgAttendance >= 75 ? '#10d9a0' : '#f59e0b', accent: '#f59e0b' },
                { icon: '💬', label: 'Active Queries', value: queries.filter(q => q.status !== 'resolved').length, change: 'Click to view', changeColor: '#8b5cf6', accent: '#8b5cf6' },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ '--accent': s.accent }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.accent, borderRadius: '20px 20px 0 0' }}></div>
                  <div className="stat-card-icon">{s.icon}</div>
                  <div className="stat-card-value">{s.value}</div>
                  <div className="stat-card-label">{s.label}</div>
                  <div className="stat-card-change" style={{ color: s.changeColor }}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Quick Info */}
            <div className="content-section">
              <div className="section-header">
                <div className="section-title">📋 Your Academic Profile</div>
              </div>
              <div className="card-grid">
                {[
                  { label: 'Student ID', value: user?.studentId || 'STU2024001', icon: '🆔' },
                  { label: 'Program', value: user?.course || 'B.Tech Computer Science', icon: '📚' },
                  { label: 'Semester', value: `Semester ${user?.semester || 3}`, icon: '📆' },
                  { label: 'Email', value: user?.email || 'student@edu.in', icon: '✉️' },
                ].map((item, i) => (
                  <div key={i} className="info-card" style={{ borderLeft: '3px solid #4f8ef7' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEES */}
        {activeSection === 'fees' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">💳 Fee Portal</h1>
              <p className="dashboard-subtitle">Track your semester fees, payment history and dues</p>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 28 }}>
              <div className="stat-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#4f8ef7', borderRadius: '20px 20px 0 0' }}></div>
                <div className="stat-card-icon">💰</div>
                <div className="stat-card-value">₹{totalFees.toLocaleString()}</div>
                <div className="stat-card-label">Total Fee</div>
              </div>
              <div className="stat-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#10d9a0', borderRadius: '20px 20px 0 0' }}></div>
                <div className="stat-card-icon">✅</div>
                <div className="stat-card-value">₹{paidFees.toLocaleString()}</div>
                <div className="stat-card-label">Amount Paid</div>
              </div>
              <div className="stat-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#ef4444', borderRadius: '20px 20px 0 0' }}></div>
                <div className="stat-card-icon">⚠️</div>
                <div className="stat-card-value">₹{dueFees.toLocaleString()}</div>
                <div className="stat-card-label">Amount Due</div>
              </div>
            </div>

            <div className="content-section">
              <div className="section-title" style={{ marginBottom: 16 }}>Fee History</div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Receipt ID</th>
                      <th>Semester</th>
                      <th>Total Amount</th>
                      <th>Paid</th>
                      <th>Due</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_FEES.map(f => (
                      <tr key={f.id}>
                        <td><code style={{ color: '#4f8ef7', fontSize: '0.85rem' }}>{f.id}</code></td>
                        <td>{f.semester}</td>
                        <td>₹{f.amount.toLocaleString()}</td>
                        <td style={{ color: '#10d9a0' }}>₹{f.paid.toLocaleString()}</td>
                        <td style={{ color: f.due > 0 ? '#ef4444' : '#10d9a0' }}>₹{f.due.toLocaleString()}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{f.date}</td>
                        <td>
                          <span className={`badge badge-${f.status === 'paid' ? 'green' : f.status === 'partial' ? 'orange' : 'red'}`}>
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* GRADES */}
        {activeSection === 'grades' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">📝 Grades & Results</h1>
              <p className="dashboard-subtitle">Semester 3 academic performance</p>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Code</th>
                    <th>Credits</th>
                    <th>Marks</th>
                    <th>Grade</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_GRADES.map((g, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{g.subject}</td>
                      <td><span className="badge badge-blue">{g.code}</span></td>
                      <td style={{ color: 'var(--text-secondary)' }}>{g.credits}</td>
                      <td>{g.marks}/{g.maxMarks}</td>
                      <td>
                        <span style={{
                          background: g.grade.startsWith('A') ? 'rgba(16,217,160,0.15)' : 'rgba(245,158,11,0.15)',
                          color: g.grade.startsWith('A') ? '#10d9a0' : '#f59e0b',
                          padding: '3px 10px', borderRadius: '999px', fontWeight: 700, fontSize: '0.82rem'
                        }}>{g.grade}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: `${g.marks}%`, height: '100%', background: g.marks >= 90 ? '#10d9a0' : g.marks >= 75 ? '#4f8ef7' : '#f59e0b', borderRadius: 3 }}></div>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: 30 }}>{g.marks}%</span>
                        </div>
                      </td>
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
              <h1 className="dashboard-title">📅 Attendance</h1>
              <p className="dashboard-subtitle">Your subject-wise attendance summary</p>
            </div>
            <div className="card-grid">
              {SAMPLE_ATTENDANCE.map((a, i) => (
                <div key={i} className="info-card" style={{ borderLeft: `3px solid ${a.percentage >= 75 ? '#10d9a0' : '#ef4444'}` }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>{a.subject}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                    <span>Present: {a.present}/{a.total}</span>
                    <span style={{ color: a.percentage >= 75 ? '#10d9a0' : '#ef4444', fontWeight: 700 }}>{a.percentage}%</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${a.percentage}%`, height: '100%', background: a.percentage >= 75 ? 'linear-gradient(90deg, #10d9a0, #059669)' : 'linear-gradient(90deg, #ef4444, #dc2626)', borderRadius: 4, transition: 'width 1s ease' }}></div>
                  </div>
                  {a.percentage < 75 && <div style={{ fontSize: '0.75rem', color: '#fca5a5', marginTop: 8 }}>⚠ Below 75% threshold</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIMETABLE */}
        {activeSection === 'schedule' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">🗓️ Timetable</h1>
              <p className="dashboard-subtitle">Your weekly class schedule</p>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>Day</th><th>Morning (9AM)</th><th>Afternoon (11AM)</th><th>Evening (2PM)</th></tr></thead>
                <tbody>
                  {SAMPLE_TIMETABLE.map((t, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: '#4f8ef7' }}>{t.day}</td>
                      {t.slots.map((s, j) => <td key={j} style={{ fontSize: '0.88rem' }}>{s}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUERIES */}
        {activeSection === 'queries' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">💬 My Queries</h1>
              <p className="dashboard-subtitle">Submit and track your queries to the administration</p>
            </div>

            <div className="info-card" style={{ marginBottom: 24 }}>
              <div className="section-title" style={{ marginBottom: 16 }}>📝 Submit New Query</div>
              <form onSubmit={handleQuerySubmit}>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" placeholder="Brief subject of your query" value={querySubject} onChange={e => setQuerySubject(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Query Details</label>
                  <textarea className="form-input" rows="4" placeholder="Describe your query in detail..." value={queryText} onChange={e => setQueryText(e.target.value)} required style={{ resize: 'vertical' }}></textarea>
                </div>
                <button id="submit-query" type="submit" className="btn btn-student">📤 Submit Query</button>
              </form>
            </div>

            <div className="section-title" style={{ marginBottom: 16 }}>📋 Query History</div>
            <div className="table-container">
              <table>
                <thead><tr><th>ID</th><th>Subject</th><th>Date</th><th>Status</th><th>Reply</th></tr></thead>
                <tbody>
                  {queries.map(q => (
                    <tr key={q.id}>
                      <td><code style={{ color: '#4f8ef7', fontSize: '0.85rem' }}>{q.id}</code></td>
                      <td style={{ fontWeight: 500 }}>{q.subject}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{q.date}</td>
                      <td><span className={`badge ${q.status === 'resolved' ? 'badge-green' : q.status === 'in-progress' ? 'badge-blue' : 'badge-orange'}`}>{q.status}</span></td>
                      <td style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{q.reply}</td>
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
