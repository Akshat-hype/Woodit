import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { mediaService } from '../../services/media.service';
import { testimonialService } from '../../services/testimonial.service';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';

const emptyForm = {
  client_name: '',
  company: '',
  testimonial_text: '',
  image_url: '',
  is_visible: true,
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isEditing = modalMode === 'edit';

  const loadTestimonials = () => {
    setLoading(true);
    testimonialService.getAllAdmin()
      .then((res) => setTestimonials(res.data.data.testimonials ?? []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openCreate = () => {
    setActiveItem(null);
    setForm(emptyForm);
    setModalMode('create');
  };

  const openEdit = (testimonial) => {
    setActiveItem(testimonial);
    setForm({
      client_name: testimonial.client_name ?? '',
      company: testimonial.company ?? '',
      testimonial_text: testimonial.testimonial_text ?? '',
      image_url: testimonial.image_url ?? '',
      is_visible: testimonial.is_visible !== false,
    });
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setActiveItem(null);
    setForm(emptyForm);
  };

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const saveTestimonial = async (event) => {
    event.preventDefault();
    if (!form.client_name.trim() || !form.testimonial_text.trim()) {
      toast.error('Client name and testimonial text are required');
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await testimonialService.update(activeItem.id, form);
        toast.success('Testimonial updated');
      } else {
        await testimonialService.create(form);
        toast.success('Testimonial created');
      }
      closeModal();
      loadTestimonials();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save testimonial');
    } finally {
      setLoading(false);
    }
  };

  const uploadTestimonialImage = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      const res = await mediaService.upload(file, 'testimonials');
      updateForm('image_url', res.data.data.media.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not upload image');
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async () => {
    try {
      setLoading(true);
      await testimonialService.delete(deleteTarget.id);
      toast.success('Testimonial deleted');
      setDeleteTarget(null);
      loadTestimonials();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Testimonials</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">Manage client quotes and visibility.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]">
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>
      <div className="mt-8">
        <Table
          columns={[
            { key: 'client_name', label: 'Client' },
            { key: 'company', label: 'Company', render: (row) => row.company || '-' },
            { key: 'visible', label: 'Visible', render: (row) => (row.is_visible ? 'Yes' : 'No') },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="flex gap-2">
                  <button onClick={() => openEdit(row)} className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] hover:bg-[var(--color-background)]" aria-label="Edit testimonial">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleteTarget(row)} className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] text-red-600 hover:bg-red-50" aria-label="Delete testimonial">
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          rows={testimonials}
          emptyMessage={loading ? 'Loading testimonials...' : 'No testimonials yet'}
        />
      </div>

      {modalMode && (
        <Modal title={isEditing ? 'Edit Testimonial' : 'Add Testimonial'} onClose={closeModal}>
          <form onSubmit={saveTestimonial} className="grid gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Client name</span>
              <input value={form.client_name} onChange={(event) => updateForm('client_name', event.target.value)} className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" required />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Company / Project</span>
              <input value={form.company} onChange={(event) => updateForm('company', event.target.value)} className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Testimonial</span>
              <textarea value={form.testimonial_text} onChange={(event) => updateForm('testimonial_text', event.target.value)} className="mt-2 min-h-32 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" required />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Upload Image / Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => uploadTestimonialImage(event.target.files?.[0])}
                className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm file:mr-4 file:rounded-sm file:border-0 file:bg-[var(--color-background)] file:px-3 file:py-2 file:text-sm file:font-medium"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Uploaded Image URL</span>
              <input value={form.image_url} onChange={(event) => updateForm('image_url', event.target.value)} placeholder="https://..." className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
            </label>
            <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <input type="checkbox" checked={form.is_visible} onChange={(event) => updateForm('is_visible', event.target.checked)} />
              Visible on website
            </label>
            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeModal} className="rounded-sm border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-background)]">Cancel</button>
              <button type="submit" disabled={loading} className="rounded-sm bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Saving...' : 'Save Testimonial'}</button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete testimonial"
          message={`Delete testimonial from "${deleteTarget.client_name}"?`}
          loading={loading}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={deleteTestimonial}
        />
      )}
    </section>
  );
};

export default Testimonials;
