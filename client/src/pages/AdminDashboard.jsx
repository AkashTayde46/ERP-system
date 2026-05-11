import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'fees', label: 'Fee Management', icon: '💰' },
  { id: 'queries', label: 'All Queries', icon: '💬' },
  { id: 'departments', label: 'Departments', icon: '🏛️' },
  { id: 'reports', label: 'Reports', icon: '📈' },
];

const SAMPLE_USERS = [
  { id: 'STU001', name: 'Aryan Sharma', role: 'student', email: 'aryan@edu.in', course: 'B.Tech CS', status: 'active' },
  { id: 'STU002', name: 'Priya Patel', role: 'student', email: 'priya@edu.in', course: 'B.Tech CS', status: 'active' },
  { id: 'TCH001', name: 'Dr. Ramesh Kumar', role: 'teacher', email: 'ramesh@edu.in', course: 'CS Dept', status: 'active' },
  { id: 'TCH002', name: 'Prof. Meena Shah', role: 'teacher', email: 'meena@edu.in', course: 'Maths Dept', status: 'active' },
  { id: 'STU003', name: 'Rahul Verma', role: 'student', email: 'rahul@edu.in', course: 'B.Tech CS', status: 'inactive' },
];

const SAMPLE_FEES = [
  { id: 'STU001', name: 'Aryan Sharma', course: 'B.Tech CS', sem: 3, total: 45000, paid: 45000, due: 0, status: 'paid' },
  { id: 'STU002', name: 'Priya Patel', course: 'B.Tech CS', sem: 3, total: 45000, paid: 45000, due: 0, status: 'paid' },
  { id: 'STU003', name: 'Rahul Verma', course: 'B.Tech CS', sem: 3, total: 45000, paid: 20000, due: 25000, status: 'partial' },
  { id: 'STU004', name: 'Sneha Gupta', course: 'B.Tech IT', sem: 2, total: 45000, paid: 0, due: 45000, status: 'pending' },
  { id: 'STU005', name: 'Karan Singh', course: 'B.Tech CS', sem: 3, total: 45000, paid: 30000, due: 15000, status: 'partial' },
];

const ALL_QUERIES = [
  { id: 'Q-001', user: 'Aryan Sharma', role: 'student', subject: 'Fee Receipt Not Generated', date: '2024-11-10', status: 'resolved', priority: 'medium' },
  { id: 'Q-002', user: 'Priya Patel', role: 'student', subject: 'Grade Re-evaluation Request', date: '2024-11-08', status: 'pending', priority: 'high' },
  { id: 'Q-003', user: 'Dr. Ramesh Kumar', role: 'teacher', subject: 'New Lab Equipment Request', date: '2024-11-07', status: 'in-progress', priority: 'medium' },
  { id: 'Q-004', user: 'Rahul Verma', role: 'student', subject: 'Scholarship Application', date: '2024-11-05', status: 'pending', priority: 'high' },
  { id: 'Q-005', user: 'Prof. Meena Shah', role: 'teacher', subject: 'Exam Schedule Conflict', date: '2024-11-03', status: 'resolved', priority: 'low' },
];

const DEPARTMENTS = [
  { name: 'Computer Science', hod: 'Dr. Ramesh Kumar', students: 240, teachers: 12, courses: ['B.Tech CS', 'M.Tech CS'] },
  { name: 'Information Technology', hod: 'Prof. Suresh Nair', students: 180, teachers: 9, courses: ['B.Tech IT'] },
  { name: 'Electronics & Comm.', hod: 'Dr. Kavita Joshi', students: 160, teachers: 10, courses: ['B.Tech ECE'] },
  { name: 'Mathematics', hod: 'Prof. Meena Shah', students: 0, teachers: 8, courses: ['B.Sc Maths', 'M.Sc Maths'] },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [queries, setQueries] = useState(ALL_QUERIES);
  const [users, setUsers] = useState(SAMPLE_USERS);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const resolveQuery = (id) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, status: 'resolved' } : q));
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const totalFee = SAMPLE_FEES.reduce((a, f) => a + f.total, 0);
  const collectedFee = SAMPLE_FEES.reduce((a, f) => a + f.paid, 0);
  const pendingFee = totalFee - collectedFee;
  const collectionRate = Math.round((collectedFee / totalFee) * 100);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>🛡️</div>
          <div>
            <div className="sidebar-logo-text">EduERP</div>
            <div className="sidebar-logo-sub">Admin Panel</div>
          </div>
        </div>

        <span className="sidebar-section-label">Administration</span>
        <ul className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <li key={item.id} className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}>
              <button
                id={`admin-nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                style={activeSection === item.id ? { background: 'rgba(139,92,246,0.15)', color: '#8b5cf6' } : {}}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'Administrator'}</div>
              <div className="sidebar-user-role">{user?.designation_admin || 'System Admin'}</div>
            </div>
          </div>
          <button id="admin-logout" className="btn btn-outline btn-full" style={{ marginTop: 10, fontSize: '0.85rem' }} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">System Overview 🛡️</h1>
              <p className="dashboard-subtitle">ERP Administration Panel — {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className="stats-grid">
              {[
                { icon: '🎓', label: 'Total Students', value: SAMPLE_USERS.filter(u => u.role === 'student').length, change: '3 active', color: '#4f8ef7' },
                { icon: '👨‍🏫', label: 'Total Teachers', value: SAMPLE_USERS.filter(u => u.role === 'teacher').length, change: '2 departments', color: '#10d9a0' },
                { icon: '💰', label: 'Fee Collected', value: `₹${(collectedFee/1000).toFixed(0)}K`, change: `${collectionRate}% collection rate`, color: '#f59e0b' },
                { icon: '💬', label: 'Open Queries', value: queries.filter(q => q.status !== 'resolved').length, change: 'Needs attention', color: '#ef4444' },
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

            {/* Fee Collection Bar */}
            <div className="info-card" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div className="section-title">💰 Overall Fee Collection Progress</div>
                <span className="badge badge-purple">{collectionRate}% Collected</span>
              </div>
              <div style={{ height: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ width: `${collectionRate}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #4f8ef7)', borderRadius: 6, transition: 'width 1s ease' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: '#10d9a0' }}>Collected: ₹{collectedFee.toLocaleString()}</span>
                <span style={{ color: '#ef4444' }}>Pending: ₹{pendingFee.toLocaleString()}</span>
                <span>Total: ₹{totalFee.toLocaleString()}</span>
              </div>
            </div>

            {/* Recent Queries */}
            <div className="content-section">
              <div className="section-title" style={{ marginBottom: 14 }}>🔔 Recent Queries</div>
              <div className="table-container">
                <table>
                  <thead><tr><th>User</th><th>Role</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {queries.slice(0, 4).map(q => (
                      <tr key={q.id}>
                        <td style={{ fontWeight: 500 }}>{q.user}</td>
                        <td><span className={`badge ${q.role === 'student' ? 'badge-blue' : 'badge-green'}`}>{q.role}</span></td>
                        <td style={{ fontSize: '0.88rem' }}>{q.subject}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{q.date}</td>
                        <td><span className={`badge ${q.status === 'resolved' ? 'badge-green' : q.status === 'in-progress' ? 'badge-blue' : 'badge-orange'}`}>{q.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {activeSection === 'users' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">👥 User Management</h1>
              <p className="dashboard-subtitle">Manage all students, teachers, and staff</p>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Email</th><th>Department/Course</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><code style={{ color: '#8b5cf6', fontSize: '0.85rem' }}>{u.id}</code></td>
                      <td style={{ fontWeight: 500 }}>{u.name}</td>
                      <td><span className={`badge ${u.role === 'student' ? 'badge-blue' : 'badge-green'}`}>{u.role}</span></td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                      <td style={{ fontSize: '0.88rem' }}>{u.course}</td>
                      <td><span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-red'}`}>{u.status}</span></td>
                      <td>
                        <button
                          id={`toggle-user-${u.id}`}
                          className={`btn ${u.status === 'active' ? 'btn-outline' : 'btn-admin'}`}
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          onClick={() => toggleUserStatus(u.id)}
                        >
                          {u.status === 'active' ? '🚫 Disable' : '✅ Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FEES */}
        {activeSection === 'fees' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">💰 Fee Management</h1>
              <p className="dashboard-subtitle">Complete student fee status and collection summary</p>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 28 }}>
              <div className="stat-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#8b5cf6', borderRadius: '20px 20px 0 0' }}></div>
                <div className="stat-card-icon">📊</div>
                <div className="stat-card-value">₹{totalFee.toLocaleString()}</div>
                <div className="stat-card-label">Total Billable</div>
              </div>
              <div className="stat-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#10d9a0', borderRadius: '20px 20px 0 0' }}></div>
                <div className="stat-card-icon">✅</div>
                <div className="stat-card-value">₹{collectedFee.toLocaleString()}</div>
                <div className="stat-card-label">Collected</div>
              </div>
              <div className="stat-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#ef4444', borderRadius: '20px 20px 0 0' }}></div>
                <div className="stat-card-icon">⏳</div>
                <div className="stat-card-value">₹{pendingFee.toLocaleString()}</div>
                <div className="stat-card-label">Outstanding</div>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead><tr><th>Student ID</th><th>Name</th><th>Course</th><th>Semester</th><th>Total</th><th>Paid</th><th>Due</th><th>Status</th></tr></thead>
                <tbody>
                  {SAMPLE_FEES.map(f => (
                    <tr key={f.id}>
                      <td><code style={{ color: '#8b5cf6', fontSize: '0.85rem' }}>{f.id}</code></td>
                      <td style={{ fontWeight: 500 }}>{f.name}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{f.course}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>Sem {f.sem}</td>
                      <td>₹{f.total.toLocaleString()}</td>
                      <td style={{ color: '#10d9a0' }}>₹{f.paid.toLocaleString()}</td>
                      <td style={{ color: f.due > 0 ? '#ef4444' : '#10d9a0' }}>₹{f.due.toLocaleString()}</td>
                      <td><span className={`badge ${f.status === 'paid' ? 'badge-green' : f.status === 'partial' ? 'badge-orange' : 'badge-red'}`}>{f.status}</span></td>
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
              <h1 className="dashboard-title">💬 All System Queries</h1>
              <p className="dashboard-subtitle">Manage queries from students and teachers</p>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>ID</th><th>From</th><th>Role</th><th>Subject</th><th>Priority</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {queries.map(q => (
                    <tr key={q.id}>
                      <td><code style={{ color: '#8b5cf6', fontSize: '0.85rem' }}>{q.id}</code></td>
                      <td style={{ fontWeight: 500 }}>{q.user}</td>
                      <td><span className={`badge ${q.role === 'student' ? 'badge-blue' : 'badge-green'}`}>{q.role}</span></td>
                      <td style={{ fontSize: '0.88rem' }}>{q.subject}</td>
                      <td>
                        <span className={`badge ${q.priority === 'high' ? 'badge-red' : q.priority === 'medium' ? 'badge-orange' : 'badge-blue'}`}>
                          {q.priority}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{q.date}</td>
                      <td><span className={`badge ${q.status === 'resolved' ? 'badge-green' : q.status === 'in-progress' ? 'badge-blue' : 'badge-orange'}`}>{q.status}</span></td>
                      <td>
                        {q.status !== 'resolved' && (
                          <button
                            id={`admin-resolve-${q.id}`}
                            className="btn btn-admin"
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
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

        {/* DEPARTMENTS */}
        {activeSection === 'departments' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">🏛️ Departments</h1>
              <p className="dashboard-subtitle">Overview of all academic departments</p>
            </div>
            <div className="card-grid">
              {DEPARTMENTS.map((dept, i) => (
                <div key={i} className="info-card" style={{ borderTop: '3px solid #8b5cf6' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{dept.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 14 }}>HOD: {dept.hod}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: '0.85rem' }}>
                    <div style={{ background: 'rgba(79,142,247,0.08)', padding: '8px 12px', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, color: '#4f8ef7' }}>{dept.students}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Students</div>
                    </div>
                    <div style={{ background: 'rgba(16,217,160,0.08)', padding: '8px 12px', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, color: '#10d9a0' }}>{dept.teachers}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Teachers</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    {dept.courses.map((c, j) => <span key={j} className="badge badge-purple" style={{ marginRight: 6, marginBottom: 4 }}>{c}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REPORTS */}
        {activeSection === 'reports' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">📈 Reports</h1>
              <p className="dashboard-subtitle">System-wide analytics and summaries</p>
            </div>
            <div className="card-grid">
              {[
                { title: 'Fee Collection Report', desc: `${collectionRate}% collected this semester. ₹${pendingFee.toLocaleString()} still outstanding.`, icon: '💰', color: '#f59e0b' },
                { title: 'Attendance Summary', desc: 'Average attendance across all departments: 84.5%. 3 students below threshold.', icon: '📅', color: '#4f8ef7' },
                { title: 'Student Performance', desc: 'Average CGPA: 8.4. Top performer: Sneha Gupta (9.6). 2 students on academic watch.', icon: '📊', color: '#10d9a0' },
                { title: 'Query Resolution Rate', desc: `${queries.filter(q => q.status === 'resolved').length}/${queries.length} queries resolved. Average resolution time: 2.3 days.`, icon: '💬', color: '#8b5cf6' },
              ].map((r, i) => (
                <div key={i} className="info-card" style={{ borderLeft: `3px solid ${r.color}` }}>
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>{r.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, color: r.color }}>{r.title}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.desc}</div>
                  <button
                    id={`download-${r.title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="btn btn-outline"
                    style={{ marginTop: 14, padding: '7px 14px', fontSize: '0.8rem' }}
                  >
                    📥 Download Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
