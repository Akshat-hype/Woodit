import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-[var(--color-background)] md:grid md:grid-cols-[260px_1fr]">
    <AdminSidebar />
    <div className="min-w-0">
      <AdminHeader />
      <main className="p-5 sm:p-8">{children}</main>
    </div>
  </div>
);

export default AdminLayout;
