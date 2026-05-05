import { Quote } from 'lucide-react';
import useFetch from '../../../hooks/useFetch';
import { testimonialService } from '../../../services/testimonial.service';

const Testimonials = () => {
  const { data, loading } = useFetch(() => testimonialService.getAll(), []);
  const testimonials = data?.testimonials || [];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="page-shell">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">Testimonials</p>
          <h2 className="font-serif text-4xl font-semibold text-[var(--color-text)]">Trusted by project buyers</h2>
        </div>

        {loading ? (
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-8 text-sm text-[var(--color-text-muted)]">
            Loading testimonials...
          </div>
        ) : testimonials.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-6">
                <Quote size={24} className="text-[var(--color-primary)]/45" />
                <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">{testimonial.testimonial_text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                  {testimonial.image_url ? (
                    <img src={testimonial.image_url} alt={testimonial.client_name} className="size-10 rounded-full object-cover" />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-sm font-semibold text-[var(--color-accent)]">
                      {testimonial.client_name?.[0] ?? 'W'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{testimonial.client_name}</p>
                    {testimonial.company && <p className="text-xs text-[var(--color-text-muted)]">{testimonial.company}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {['Hospitality projects', 'Designer partnerships', 'Global buyers'].map((label) => (
              <article key={label} className="rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-background)] p-6">
                <Quote size={22} className="text-[var(--color-primary)]/40" />
                <p className="mt-5 text-sm font-semibold text-[var(--color-text)]">{label}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                  Published client feedback will appear here once testimonials are added from admin.
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
