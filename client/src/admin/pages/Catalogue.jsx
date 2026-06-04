
import { useEffect, useState } from 'react';
import { ExternalLink, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { catalogueService } from '../../services/catalogue.service';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';

const emptyForm = {
  title: '',
  description: '',
  pdf: null,
};

const Catalogue = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadCatalogues = () => {
    setLoading(true);

    catalogueService
      .getAllAdmin()
      .then((res) => {
        setCatalogues(res.data.data.catalogues ?? []);
      })
      .catch(() => {
        setCatalogues([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCatalogues();
  }, []);

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const uploadCatalogue = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!form.pdf) {
      toast.error('Please select a PDF file');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('pdf', form.pdf);

      await catalogueService.upload(formData);

      toast.success('Catalogue uploaded successfully');

      setShowModal(false);
      setForm(emptyForm);

      loadCatalogues();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Could not upload catalogue'
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCatalogue = async () => {
    try {
      setLoading(true);

      await catalogueService.delete(deleteTarget.id);

      toast.success('Catalogue deleted successfully');

      setDeleteTarget(null);

      loadCatalogues();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Could not delete catalogue'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[var(--color-text)]">
            Catalogue
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Upload and manage downloadable PDF catalogues.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          <Upload size={16} />
          Upload Catalogue
        </button>
      </div>

      <div className="mt-8">
        <Table
          columns={[
            {
              key: 'title',
              label: 'Title',
            },
            {
              key: 'description',
              label: 'Description',
              render: (row) => row.description || '-',
            },
            {
              key: 'uploaded_at',
              label: 'Uploaded',
              render: (row) =>
                row.uploaded_at
                  ? new Date(row.uploaded_at).toLocaleString()
                  : '-',
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="flex gap-2">
                  {row.file_url && (
                    <a
                      href={row.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] hover:bg-[var(--color-background)]"
                      aria-label="Open catalogue"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}

                  <button
                    onClick={() => setDeleteTarget(row)}
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] text-red-600 hover:bg-red-50"
                    aria-label="Delete catalogue"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          rows={catalogues}
          emptyMessage={
            loading
              ? 'Loading catalogues...'
              : 'No catalogue uploaded yet'
          }
        />
      </div>

      {showModal && (
        <Modal
          title="Upload Catalogue"
          description="Upload a PDF catalogue. The latest uploaded catalogue will be shown publicly."
          onClose={() => setShowModal(false)}
        >
          <form
            onSubmit={uploadCatalogue}
            className="grid gap-4"
          >
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                Catalogue Title
              </span>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  updateForm('title', e.target.value)
                }
                className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                Description
              </span>

              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  updateForm('description', e.target.value)
                }
                className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
                placeholder="Optional description"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                PDF File
              </span>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    pdf: e.target.files?.[0] || null,
                  }))
                }
                className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm file:mr-4 file:rounded-sm file:border-0 file:bg-[var(--color-background)] file:px-3 file:py-2 file:text-sm file:font-medium"
                required
              />
            </label>

            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-sm border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-background)]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-sm bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? 'Uploading...' : 'Upload Catalogue'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete catalogue"
          message={`Delete "${deleteTarget.title}"?`}
          loading={loading}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={deleteCatalogue}
        />
      )}
    </section>
  );
};

export default Catalogue;
