import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { inquiryService } from '../../services/inquiry.service';
import Table from '../components/common/Table';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  const loadInquiries = () => {
    inquiryService.getAll()
      .then((res) => setInquiries(res.data.data.inquiries ?? []))
      .catch(() => setInquiries([]));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await inquiryService.updateStatus(id, status);
      toast.success('Status updated');
      loadInquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update status');
    }
  };

  return (
    <section>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Inquiries</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Track phone captures and product interest.</p>
      </div>

      <div className="mt-8">
        <Table
          columns={[
            { key: 'phone', label: 'Phone' },
            { key: 'product_name', label: 'Product' },
            { key: 'category_slug', label: 'Category' },
            {
              key: 'status',
              label: 'Status',
              render: (row) => (
                <select
                  value={row.status}
                  onChange={(event) => updateStatus(row.id, event.target.value)}
                  className="rounded-sm border border-[var(--color-border)] bg-white px-2 py-1 text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              ),
            },
            { key: 'created_at', label: 'Date', render: (row) => new Date(row.created_at).toLocaleString() },
          ]}
          rows={inquiries}
          emptyMessage="No inquiries yet"
        />
      </div>
    </section>
  );
};

export default Inquiries;
