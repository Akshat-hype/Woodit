import { useEffect, useState } from 'react';
import { ExternalLink, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { catalogueService } from '../../services/catalogue.service';
import { mediaService } from '../../services/media.service';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';

const emptyForm = { file_name: '', file_url: '', version: '' };

const Catalogue = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadCatalogues = () => {
    setLoading(true);
    catalogueService.getAllAdmin()
      .then((res) => setCatalogues(res.data.data.catalogues ?? []))
      .catch(() => setCatalogues([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCatalogues();
  }, []);

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const uploadCatalogue = async (event) => {
    event.preventDefault();
    if (!form.file_name.trim() || !form.file_url.trim()) {
      toast.error('File name and file URL are required');
      return;
    }

    try {
      setLoading(true);
      await catalogueService.upload(form);
      toast.success('Catalogue added');
      setShowModal(false);
      setForm(emptyForm);
      loadCatalogues();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add catalogue');
    } finally {
      setLoading(false);
    }
  };

  const uploadCatalogueFile = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      const res = await mediaService.upload(file, 'catalogue');
      setForm((prev) => ({
        ...prev,
        file_name: prev.file_name || file.name,
        file_url: res.data.data.media.url,
      }));
      toast.success('PDF uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not upload PDF');
    } finally {
      setLoading(false);
    }
  };

  const deleteCatalogue = async () => {
    try {
      setLoading(true);
      await catalogueService.delete(deleteTarget.id);
      toast.success('Catalogue deleted');
      setDeleteTarget(null);
      loadCatalogues();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete catalogue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Catalogue</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">Manage downloadable PDF catalogue links.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]">
          <Upload size={16} />
          Add PDF URL
        </button>
      </div>
      <div className="mt-8">
        <Table
          columns={[
            { key: 'file_name', label: 'File', render: (row) => row.file_name || row.name || '-' },
            { key: 'version', label: 'Version', render: (row) => row.version || '-' },
            { key: 'uploaded_at', label: 'Uploaded', render: (row) => (row.uploaded_at ? new Date(row.uploaded_at).toLocaleString() : '-') },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="flex gap-2">
                  {row.file_url && (
                    <a href={row.file_url} target="_blank" rel="noreferrer" className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] hover:bg-[var(--color-background)]" aria-label="Open catalogue">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button onClick={() => setDeleteTarget(row)} className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] text-red-600 hover:bg-red-50" aria-label="Delete catalogue">
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          rows={catalogues}
          emptyMessage={loading ? 'Loading catalogues...' : 'No catalogue files yet'}
        />
      </div>

      {showModal && (
        <Modal title="Add Catalogue PDF" description="Upload a PDF. The latest uploaded catalogue is used publicly." onClose={() => setShowModal(false)}>
          <form onSubmit={uploadCatalogue} className="grid gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Upload PDF</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => uploadCatalogueFile(event.target.files?.[0])}
                className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm file:mr-4 file:rounded-sm file:border-0 file:bg-[var(--color-background)] file:px-3 file:py-2 file:text-sm file:font-medium"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">File name</span>
              <input value={form.file_name} onChange={(event) => updateForm('file_name', event.target.value)} className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" required />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Uploaded PDF URL</span>
              <input value={form.file_url} onChange={(event) => updateForm('file_url', event.target.value)} placeholder="https://..." className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" required />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Version</span>
              <input value={form.version} onChange={(event) => updateForm('version', event.target.value)} placeholder="v1, May 2026, etc." className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
            </label>
            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setShowModal(false)} className="rounded-sm border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-background)]">Cancel</button>
              <button type="submit" disabled={loading} className="rounded-sm bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Saving...' : 'Save Catalogue'}</button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete catalogue"
          message={`Delete "${deleteTarget.file_name || deleteTarget.name}"?`}
          loading={loading}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={deleteCatalogue}
        />
      )}
    </section>
  );
};

export default Catalogue;
