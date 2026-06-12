const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)] z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      <Spinner />
    </div>
  );
};

const Spinner = () => (
  <div className="flex flex-col items-center gap-3">
    <div className="w-10 h-10 border-2 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin" />
    <span className="text-sm text-[var(--color-text-muted)]">Loading...</span>
  </div>
);

export default Loader;