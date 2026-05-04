import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Inquiries from '../pages/Inquiries';
import Banners from '../pages/Banners';
import Testimonials from '../pages/Testimonials';
import Catalogue from '../pages/Catalogue';

// Protects all admin routes
const AdminGuard = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
};

const AdminRoutes = () => {
  return (
    <AdminGuard>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/banners" element={<Banners />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminRoutes;