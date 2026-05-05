import Modal from './Modal';

const ConfirmDialog = ({ title = 'Confirm action', message, confirmLabel = 'Delete', loading, onCancel, onConfirm }) => (
  <Modal title={title} onClose={onCancel}>
    <p className="text-sm leading-6 text-[var(--color-text-muted)]">{message}</p>
    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-sm border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-background)]"
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={onConfirm}
        className="rounded-sm bg-red-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? 'Working...' : confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
