import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Button from '../../website/components/common/Button';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAdmin, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const user = await login(form);
      if (user?.user_metadata?.role !== 'admin') {
        toast.error('Admin access only');
        return;
      }
      toast.success('Welcome back');
      navigate('/admin', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-[var(--color-border)] rounded-sm p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-medium mb-3">WoodIt Admin</p>
        <h1 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Manage products, inquiries, banners, testimonials, and catalogue files.</p>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
              required
            />
          </label>
        </div>

        <Button type="submit" loading={submitting} className="mt-6 w-full">
          Login
        </Button>
      </form>
    </main>
  );
};

export default AdminLogin;
