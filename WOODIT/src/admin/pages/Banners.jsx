import { useEffect, useState } from "react";
import { Pencil, Plus, Save, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { bannerService } from "../../services/banner.service";
import { categoryService } from "../../services/category.service";
import { mediaService } from "../../services/media.service";
import { CATEGORIES } from "../../utils/constants";
import { compressImageForUpload } from "../../utils/imageCompression";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Modal from "../components/common/Modal";
import Table from "../components/common/Table";

const emptyForm = {
  type: "hero",
  category_slug: "",
  media_url: "",
  media_type: "image",
  is_active: true,
};

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryBannerDrafts, setCategoryBannerDrafts] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [activeBanner, setActiveBanner] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isEditing = modalMode === "edit";

  const loadData = () => {
    setLoading(true);
    Promise.allSettled([bannerService.getAll(), categoryService.getAll()])
      .then(([bannersResult, categoriesResult]) => {
        const nextBanners = bannersResult.value?.data?.data?.banners ?? [];
        const nextCategories =
          categoriesResult.value?.data?.data?.categories ?? [];
        setBanners(nextBanners);
        setCategories(nextCategories);
        setCategoryBannerDrafts(
          Object.fromEntries(
            nextCategories.map((category) => [
              category.id,
              category.banner_url ?? "",
            ]),
          ),
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setActiveBanner(null);
    setForm(emptyForm);
    setModalMode("create");
  };

  const openEdit = (banner) => {
    setActiveBanner(banner);
    setForm({
      type: banner.type ?? "hero",
      category_slug: banner.category_slug ?? "",
      media_url: banner.media_url ?? "",
      media_type: banner.media_type ?? "image",
      is_active: banner.is_active !== false,
    });
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setActiveBanner(null);
    setForm(emptyForm);
  };

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const saveBanner = async (event) => {
    event.preventDefault();
    if (!form.media_url.trim()) {
      toast.error("Media URL is required");
      return;
    }
    if (form.type === "category" && !form.category_slug) {
      toast.error("Select a category for category banners");
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await bannerService.update(activeBanner.id, {
          media_url: form.media_url,
          media_type: form.media_type,
          is_active: form.is_active,
        });
        toast.success("Banner updated");
      } else {
        await bannerService.create({
          type: form.type,
          category_slug: form.type === "category" ? form.category_slug : null,
          media_url: form.media_url,
          media_type: form.media_type,
        });
        toast.success("Banner created");
      }
      closeModal();
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save banner");
    } finally {
      setLoading(false);
    }
  };

  const uploadBannerMedia = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      const folder = form.type === "category" ? "category-banners" : "banners";
      const uploadFile = await compressImageForUpload(file);
      const res = await mediaService.upload(uploadFile, folder);
      updateForm("media_url", res.data.data.media.url);
      updateForm(
        "media_type",
        uploadFile.type.startsWith("video/") ? "video" : "image",
      );
      toast.success("Media uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not upload media");
    } finally {
      setLoading(false);
    }
  };

  const uploadCategoryBanner = async (category, file) => {
    if (!file || !category.id) return;

    try {
      setLoading(true);
      const uploadFile = await compressImageForUpload(file);
      const res = await mediaService.upload(uploadFile, "category-banners");
      setCategoryBannerDrafts((prev) => ({
        ...prev,
        [category.id]: res.data.data.media.url,
      }));
      toast.success("Category banner uploaded");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Could not upload category banner",
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async () => {
    try {
      setLoading(true);
      await bannerService.delete(deleteTarget.id);
      toast.success("Banner deleted");
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete banner");
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryBanner = async (category) => {
    try {
      setLoading(true);
      await categoryService.updateBanner(
        category.id,
        categoryBannerDrafts[category.id] ?? "",
      );
      toast.success("Category banner updated");
      loadData();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Could not update category banner",
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
            Banners
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Manage homepage banners and category banner URLs.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          <Plus size={16} />
          Add Banner
        </button>
      </div>

      <div className="mt-8">
        <Table
          columns={[
            { key: "type", label: "Type", render: (row) => row.type ?? "-" },
            {
              key: "category_slug",
              label: "Category",
              render: (row) => row.category_slug ?? "-",
            },
            {
              key: "media_type",
              label: "Media",
              render: (row) => row.media_type ?? "-",
            },
            {
              key: "active",
              label: "Active",
              render: (row) => (row.is_active ? "Yes" : "No"),
            },
            {
              key: "actions",
              label: "Actions",
              render: (row) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(row)}
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] hover:bg-[var(--color-background)]"
                    aria-label="Edit banner"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(row)}
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-[var(--color-border)] text-red-600 hover:bg-red-50"
                    aria-label="Delete banner"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          rows={banners}
          emptyMessage={
            loading ? "Loading banners..." : "No active banners yet"
          }
        />
      </div>

      <div className="mt-10">
        <div className="mb-4">
          <h2 className="font-serif text-2xl font-semibold text-[var(--color-text)]">
            Category Page Banners
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            These update the banner image URL stored directly on each category.
          </p>
        </div>
        <div className="grid gap-3">
          {(categories.length ? categories : CATEGORIES).map((category) => (
            <div
              key={category.id ?? category.slug}
              className="grid gap-3 rounded-sm border border-[var(--color-border)] bg-white p-4 lg:grid-cols-[240px_1fr_auto] lg:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {category.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {category.slug}
                </p>
              </div>
              <div className="w-full">
                <div className="mb-2 text-xs text-[var(--color-text-muted)]">
                  Current banner (uploaded)
                </div>
                <div className="mb-2">
                  {categoryBannerDrafts[category.id] || category.banner_url ? (
                    <img
                      src={
                        categoryBannerDrafts[category.id] || category.banner_url
                      }
                      alt={category.name}
                      className="w-full rounded-sm object-cover"
                    />
                  ) : (
                    <div className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm text-[var(--color-text-muted)]">
                      No banner uploaded
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  disabled={!category.id}
                  onChange={(event) =>
                    uploadCategoryBanner(category, event.target.files?.[0])
                  }
                  className="w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm file:mr-4 file:rounded-sm file:border-0 file:bg-[var(--color-background)] file:px-3 file:py-2 file:text-sm file:font-medium disabled:bg-[var(--color-background)] lg:col-start-2"
                />
              </div>
              <button
                disabled={!category.id || loading}
                onClick={() => updateCategoryBanner(category)}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalMode && (
        <Modal
          title={isEditing ? "Edit Banner" : "Add Banner"}
          description="Use hosted image or video URLs."
          onClose={closeModal}
        >
          <form onSubmit={saveBanner} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                  Type
                </span>
                <select
                  disabled={isEditing}
                  value={form.type}
                  onChange={(event) => updateForm("type", event.target.value)}
                  className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] disabled:bg-[var(--color-background)]"
                >
                  <option value="hero">Hero</option>
                  <option value="category">Category</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                  Media type
                </span>
                <select
                  value={form.media_type}
                  onChange={(event) =>
                    updateForm("media_type", event.target.value)
                  }
                  className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </label>
            </div>
            {form.type === "category" && (
              <label className="block">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                  Category
                </span>
                <select
                  disabled={isEditing}
                  value={form.category_slug}
                  onChange={(event) =>
                    updateForm("category_slug", event.target.value)
                  }
                  className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] disabled:bg-[var(--color-background)]"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="block">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                Upload Media
              </span>
              <input
                type="file"
                accept="image/*,video/mp4"
                onChange={(event) => uploadBannerMedia(event.target.files?.[0])}
                className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm file:mr-4 file:rounded-sm file:border-0 file:bg-[var(--color-background)] file:px-3 file:py-2 file:text-sm file:font-medium"
              />
              <div className="mt-2 text-xs text-[var(--color-text-muted)]">
                Uploaded media will be used automatically; manual URLs are not
                allowed.
              </div>
              {form.media_url && (
                <div className="mt-2">
                  {form.media_type === "video" ? (
                    <video
                      src={form.media_url}
                      className="w-full rounded-sm"
                      controls
                    />
                  ) : (
                    <img
                      src={form.media_url}
                      alt="uploaded"
                      className="w-full rounded-sm object-cover"
                    />
                  )}
                </div>
              )}
            </label>
            {isEditing && (
              <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(event) =>
                    updateForm("is_active", event.target.checked)
                  }
                />
                Active
              </label>
            )}
            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-sm border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-background)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-sm bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Banner"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete banner"
          message="Delete this banner? This cannot be undone."
          loading={loading}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={deleteBanner}
        />
      )}
    </section>
  );
};

export default Banners;
