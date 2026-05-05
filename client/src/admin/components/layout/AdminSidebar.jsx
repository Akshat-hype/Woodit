import { NavLink } from 'react-router-dom';
import { BarChart3, FileText, Image, Inbox, MessageSquareQuote, Package } from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: BarChart3, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { to: '/admin/banners', label: 'Banners', icon: Image },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/catalogue', label: 'Catalogue', icon: FileText },
];

const AdminSidebar = () => (
  <aside className="hidden md:block min-h-screen bg-white border-r border-[var(--color-border)] p-4">
    <div className="px-3 py-3">
      <h1 className="font-serif text-2xl font-semibold text-[var(--color-text)]">WoodIt</h1>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-primary)] mt-1">Admin</p>
    </div>
    <nav className="mt-6 space-y-1">
      {navItems.map((item) => {
        const NavIcon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-sm px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-background)] text-[var(--color-primary-dark)]'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]'
              }`
            }
          >
            <NavIcon size={18} />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  </aside>
);

export default AdminSidebar;
