import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './AccountantDashboard.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'fees', label: 'Fee Records' },
  { id: 'receipts', label: 'Receipts' },
];

export default function AccountantDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({
    student: '',
    title: '',
    amount: '',
    amountPaid: '',
    dueDate: '',
    method: '',
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  useEffect(() => {
    const loadFees = async () => {
      try {
        const { data } = await apiClient.get('/api/fees');
        setFees(data.fees || []);
      } catch (error) {
        setFees([]);
      }
    };
    loadFees();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        student: form.student,
        title: form.title,
        amount: Number(form.amount),
        amountPaid: Number(form.amountPaid || 0),
        dueDate: form.dueDate || undefined,
        method: form.method,
      };
      const { data } = await apiClient.post('/api/fees', payload);
      setFees(prev => [data.fee, ...prev]);
      setForm({ student: '', title: '', amount: '', amountPaid: '', dueDate: '', method: '' });
    } catch (error) {
      // Keep silent for prototype
    }
  };

  const totalFees = fees.reduce((sum, f) => sum + (f.amount || 0), 0);
  const totalCollected = fees.reduce((sum, f) => sum + (f.amountPaid || 0), 0);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar accountant-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">AC</div>
          <div>
            <div className="sidebar-logo-text">EduERP</div>
            <div className="sidebar-logo-sub">Accountant Panel</div>
          </div>
        </div>

        <span className="sidebar-section-label">Finance</span>
        <ul className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <li key={item.id} className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}>
              <button onClick={() => setActiveSection(item.id)}>{item.label}</button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">{user?.name?.charAt(0)?.toUpperCase() || 'A'}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'Accountant'}</div>
              <div className="sidebar-user-role">{user?.designation_accountant || 'Finance'}</div>
            </div>
          </div>
          <button className="btn btn-outline btn-full" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="main-content">
        {activeSection === 'overview' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Finance Overview</h1>
              <p className="dashboard-subtitle">Summary of fee collections</p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-value">{totalFees.toLocaleString()}</div>
                <div className="stat-card-label">Total Fee Value</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{totalCollected.toLocaleString()}</div>
                <div className="stat-card-label">Collected</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{(totalFees - totalCollected).toLocaleString()}</div>
                <div className="stat-card-label">Pending</div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'fees' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Fee Records</h1>
              <p className="dashboard-subtitle">Create and track student fees</p>
            </div>

            <form className="form-card" onSubmit={handleCreate}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Student ID</label>
                  <input className="form-input" name="student" value={form.student} onChange={handleChange} placeholder="Student Mongo ID" />
                </div>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input className="form-input" name="title" value={form.title} onChange={handleChange} placeholder="Admission Fee" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input className="form-input" name="amount" value={form.amount} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Amount Paid</label>
                  <input className="form-input" name="amountPaid" value={form.amountPaid} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input className="form-input" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Method</label>
                  <input className="form-input" name="method" value={form.method} onChange={handleChange} placeholder="Cash / Bank" />
                </div>
              </div>
              <button className="btn btn-accountant" type="submit">Create Fee</button>
            </form>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map(f => (
                    <tr key={f._id}>
                      <td>{f.student?.rollNumber || f.student}</td>
                      <td>{f.title || '-'}</td>
                      <td>{f.amount}</td>
                      <td>{f.amountPaid}</td>
                      <td>{f.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'receipts' && (
          <div className="animate-fade-in-up">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Receipts</h1>
              <p className="dashboard-subtitle">Receipts are generated on fee payment updates</p>
            </div>
            <div className="info-card">Use the fee update endpoint to record payments and set receipt numbers.</div>
          </div>
        )}
      </main>
    </div>
  );
}
