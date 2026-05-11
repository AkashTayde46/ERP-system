import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="spinner" style={{ width: 40, height: 40 }}></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}-dashboard`} replace />;

  return children;
};

export default ProtectedRoute;
