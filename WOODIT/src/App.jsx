import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import WebsiteRoutes from './website/routes/WebsiteRoutes';

const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes'));
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Toaster position="top-right" />
          <Suspense fallback={null}>
            <Routes>
              {/* Admin Login - outside AdminGuard */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Portal */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Main Website */}
              <Route path="/*" element={<WebsiteRoutes />} />
            </Routes>
          </Suspense>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
