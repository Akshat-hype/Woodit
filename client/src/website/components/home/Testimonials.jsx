import { Quote } from 'lucide-react';
import useFetch from '../../../hooks/useFetch';
import { testimonialService } from '../../../services/testimonial.service';

const Testimonials = () => {
  const { data, loading } = useFetch(() => testimonialService.getAll(), []);
  const testimonials = data?.testimonials || [];

  if (loading || !testimonials.length) return null;

  return (
    <section className="py-20 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-px bg-[var(--color-primary)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">Testimonials</span>
            <div className="w-6 h-px bg-[var(--color-primary)]" />
          </div>
          <h2 className="font-serif text-4xl font-semibold text-[var(--color-text)]">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="bg-white border border-[var(--color-border)] rounded-sm p-8 flex flex-col gap-4"
            >
              <Quote size={24} className="text-[var(--color-primary)]/40" />
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                {t.testimonial_text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                {t.image_url ? (
                  <img src={t.image_url} alt={t.client_name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-semibold text-sm">
                    {t.client_name[0]}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{t.client_name}</p>
                  {t.company && (
                    <p className="text-xs text-[var(--color-text-muted)]">{t.company}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;