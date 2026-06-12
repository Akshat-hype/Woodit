import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Button from '../components/common/Button';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await signup(form);
      toast.success('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-[var(--color-border)] rounded-sm p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-semibold">Signup</h1>
        <div className="mt-6 space-y-4">
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            className="w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
            required
          />
          <input
            type="tel"
            maxLength={10}
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value.replace(/\D/g, '') }))}
            placeholder="10-digit phone"
            className="w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="Password"
            className="w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
            required
          />
        </div>
        <Button type="submit" loading={loading} className="mt-6 w-full">Signup</Button>
        <Link to="/login" className="mt-4 block text-sm text-[var(--color-primary-dark)]">Already have an account?</Link>
      </form>
    </main>
  );
};

export default Signup;
