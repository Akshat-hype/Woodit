import { Link, useNavigate } from 'react-router-dom';
import { FileText, Image, Inbox, LayoutDashboard, LogOut, MessageSquareQuote, Package } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const mobileLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { to: '/admin/banners', label: 'Banners', icon: Image },
  { to: '/admin/testimonials', label: 'Reviews', icon: MessageSquareQuote },
  { to: '/admin/catalogue', label: 'Catalogue', icon: FileText },
];

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="border-b border-[var(--color-border)] bg-white">
      <div className="flex h-16 items-center justify-between px-5 sm:px-8">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)]">Admin Portal</p>
          <p className="truncate text-xs text-[var(--color-text-muted)]">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-border)] px-3 py-2 text-sm font-medium hover:bg-[var(--color-background)]"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {mobileLinks.map((item) => {
          const MobileIcon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-[var(--color-border)] px-3 py-2 text-xs font-medium text-[var(--color-text-muted)]"
            >
              <MobileIcon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default AdminHeader;
