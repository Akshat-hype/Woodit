import { X } from 'lucide-react';

const Modal = ({ title, description, children, onClose }) => (
  <div className="fixed inset-0 z-[70] flex items-end bg-black/55 px-0 sm:items-center sm:px-4">
    <section className="max-h-[92svh] w-full overflow-y-auto rounded-t-lg bg-white shadow-2xl sm:mx-auto sm:max-w-2xl sm:rounded-md">
      <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-white px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[var(--color-text)]">{title}</h2>
          {description && <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm hover:bg-[var(--color-background)]"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  </div>
);

export default Modal;
