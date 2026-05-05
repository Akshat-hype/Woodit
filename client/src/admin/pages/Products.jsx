import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { categoryService } from '../../services/category.service';
import { mediaService } from '../../services/media.service';
import { productService } from '../../services/product.service';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';

const emptyForm = {
  name: '',
  description: '',
  material: '',
  category_id: '',
  imagesText: '',
  is_featured: false,
  is_visible: true,
};

const toForm = (product) => ({
  name: product.name ?? '',
  description: product.description ?? '',
  material: product.material ?? '',
  category_id: product.category_id ?? product.categories?.id ?? '',
  imagesText: Array.isArray(product.images) ? product.images.join('\n') : '',
  is_featured: Boolean(product.is_featured),
  is_visible: product.is_visible !== false,
});

const toPayload = (form) => ({
  name: form.name.trim(),
  description: form.description.trim(),
  material: form.material.trim(),
  category_id: form.category_id,
  images: form.imagesText
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean),
  is_featured: form.is_featured,
  is_visible: form.is_visible,
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isEditing = modalMode === 'edit';

  const loadData = () => {
    setLoading(true);
    Promise.allSettled([productService.getAllAdmin(), categoryService.getAll()])
      .then(([productsResult, categoriesResult]) => {
        setProducts(productsResult.value?.data?.data?.products ?? []);
        setCategories(categoriesResult.value?.data?.data?.categories ?? []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const categoryOptions = useMemo(() => categories.map((category) => ({ value: category.id, label: category.name })), [categories]);

  const openCreate = () => {
    setActiveProduct(null);
    setForm({ ...emptyForm, category_id: categoryOptions[0]?.value ?? '' });
    setModalMode('create');
  };

  const openEdit = (product) => {
    setActiveProduct(product);
    setForm(toForm(product));
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setActiveProduct(null);
    setForm(emptyForm);
  };

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const saveProduct = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.category_id) {
      toast.error('Name and category are required');
      return;
    }

    try {
      setLoading(true);
      const payload = toPayload(form);
      if (isEditing) {
        await productService.update(activeProduct.id, payload);
        toast.success('Product updated');
      } else {
        await productService.create(payload);
        toast.success('Product created');
      }
      closeModal();
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save product');
    } finally {
      setLoading(false);
    }
  };

  const uploadProductImages = async (files) => {
    if (!files.length) return;

    try {
      setLoading(true);
      const uploads = await Promise.all(
        Array.from(files).map((file) => mediaService.upload(file, 'products'))
      );
      const urls = uploads.map((res) => res.data.data.media.url);
      setForm((prev) => ({
        ...prev,
        imagesText: [prev.imagesText, ...urls].filter(Boolean).join('\n'),
      }));
      toast.success(`${urls.length} image${urls.length > 1 ? 's' : ''} uploaded`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not upload images');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    try {
      setLoading(true);
      await productService.delete(deleteTarget.id);
      toast.success('Product deleted');
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Products</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">Manage catalogue items, images, featured status, and visibility.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="mt-8">
        <Table
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category', render: (row) => row.categories?.name ?? '-' },
            { key: 'material', label: 'Material', render: (row) => row.material || '-' },
            { key: 'featured', label: 'Featured', render: (row) => (row.is_featured ? 'Yes' : 'No') },
            { key: 'visible', label: 'Visible', render: (row) => (row.is_visible ? 'Yes' : 'No') },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="flex gap-2">
                  <button onClick={() => openEdit(row)} className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] hover:bg-[var(--color-background)]" aria-label="Edit product">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleteTarget(row)} className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] text-red-600 hover:bg-red-50" aria-label="Delete product">
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          rows={products}
          emptyMessage={loading ? 'Loading products...' : 'No products yet'}
        />
      </div>

      {modalMode && (
        <Modal title={isEditing ? 'Edit Product' : 'Add Product'} description="Upload product images, then save the product." onClose={closeModal}>
          <form onSubmit={saveProduct} className="grid gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Name</span>
              <input value={form.name} onChange={(event) => updateForm('name', event.target.value)} className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" required />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Category</span>
              <select value={form.category_id} onChange={(event) => updateForm('category_id', event.target.value)} className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" required>
                <option value="">Select category</option>
                {categoryOptions.map((category) => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Description</span>
              <textarea value={form.description} onChange={(event) => updateForm('description', event.target.value)} className="mt-2 min-h-28 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Material</span>
              <input value={form.material} onChange={(event) => updateForm('material', event.target.value)} className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Upload Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => uploadProductImages(event.target.files)}
                className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm file:mr-4 file:rounded-sm file:border-0 file:bg-[var(--color-background)] file:px-3 file:py-2 file:text-sm file:font-medium"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Uploaded Image URLs</span>
              <textarea value={form.imagesText} onChange={(event) => updateForm('imagesText', event.target.value)} placeholder="https://..." className="mt-2 min-h-24 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <input type="checkbox" checked={form.is_featured} onChange={(event) => updateForm('is_featured', event.target.checked)} />
                Featured product
              </label>
              <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <input type="checkbox" checked={form.is_visible} onChange={(event) => updateForm('is_visible', event.target.checked)} />
                Visible on website
              </label>
            </div>
            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeModal} className="rounded-sm border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-background)]">Cancel</button>
              <button type="submit" disabled={loading} className="rounded-sm bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Saving...' : 'Save Product'}</button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete product"
          message={`Delete "${deleteTarget.name}"? This cannot be undone.`}
          loading={loading}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={deleteProduct}
        />
      )}
    </section>
  );
};

export default Products;
