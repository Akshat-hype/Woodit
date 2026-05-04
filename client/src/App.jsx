import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import WebsiteRoutes from './website/routes/WebsiteRoutes';
import AdminRoutes from './admin/routes/AdminRoutes';
import AdminLogin from './admin/pages/AdminLogin';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Admin Login - outside AdminGuard */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Portal */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Main Website */}
            <Route path="/*" element={<WebsiteRoutes />} />
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;