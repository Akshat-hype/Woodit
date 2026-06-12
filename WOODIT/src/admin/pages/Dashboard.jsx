import { useEffect, useState } from 'react';
import { Inbox, Package, PhoneCall } from 'lucide-react';
import { inquiryService } from '../../services/inquiry.service';
import { productService } from '../../services/product.service';

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, inquiries: 0, new: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([productService.getAllAdmin(), inquiryService.getStats()])
      .then(([productsResult, statsResult]) => {
        const products = productsResult.value?.data?.data?.products ?? [];
        const inquiryStats = statsResult.value?.data?.data?.stats ?? {};
        setStats({
          products: products.length,
          inquiries: inquiryStats.total ?? 0,
          new: inquiryStats.new ?? 0,
          contacted: inquiryStats.contacted ?? 0,
          closed: inquiryStats.closed ?? 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total products', value: stats.products, icon: Package },
    { label: 'Total inquiries', value: stats.inquiries, icon: Inbox },
    { label: 'New inquiries', value: stats.new, icon: PhoneCall },
  ];

  return (
    <section>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Overview of catalogue activity and lead flow.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const StatIcon = card.icon;
          return (
            <article key={card.label} className="rounded-sm border border-[var(--color-border)] bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-[var(--color-text-muted)]">{card.label}</p>
                <StatIcon size={20} className="text-[var(--color-primary)]" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-[var(--color-text)]">{loading ? '-' : card.value}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 rounded-sm border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-serif text-xl font-semibold">Inquiry status</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {['new', 'contacted', 'closed'].map((key) => (
            <div key={key} className="rounded-sm bg-[var(--color-background)] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{key}</p>
              <p className="mt-2 text-2xl font-semibold">{loading ? '-' : stats[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
