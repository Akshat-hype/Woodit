import { Quote } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { testimonialService } from "../../../services/testimonial.service";

const Testimonials = () => {
  const { data, loading } = useFetch(() => testimonialService.getAll(), []);
  const testimonials = data?.testimonials || [];

  const isPlaceholder = testimonials.length === 0;

  const slides = isPlaceholder
    ? [
        {
          id: "ph-1",
          testimonial_text:
            "Published client feedback will appear here once testimonials are added from admin.",
          client_name: "Hospitality projects",
        },
        {
          id: "ph-2",
          testimonial_text:
            "Designer partnerships will be showcased here when available.",
          client_name: "Designer partnerships",
        },
        {
          id: "ph-3",
          testimonial_text: "Global buyers will leave feedback here.",
          client_name: "Global buyers",
        },
      ]
    : testimonials;

  const [active, setActive] = useState(0);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const slideWidthRef = useRef(0);

  useEffect(() => {
    posRef.current = 0;
    setActive(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (!containerRef.current || slides.length === 0) return;

    const container = containerRef.current;

    const updateSlideWidth = () => {
      slideWidthRef.current =
        window.innerWidth >= 768
          ? container.clientWidth / 2
          : container.clientWidth;
    };

    updateSlideWidth();

    let last = performance.now();
    const speed = 40;

    const loopWidth = () => slideWidthRef.current * slides.length;

    function tick(now) {
      const dt = now - last;
      last = now;

      posRef.current += (speed * dt) / 1000;

      const lw = loopWidth();

      if (lw > 0 && posRef.current >= lw) {
        posRef.current -= lw;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }

      const newActive =
        Math.floor(
          (posRef.current % (lw || 1)) / (slideWidthRef.current || 1)
        ) || 0;

      setActive((a) => (a === newActive ? a : newActive));

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);

    window.addEventListener("resize", updateSlideWidth);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", updateSlideWidth);
    };
  }, [slides.length, loading]);

  const goPrev = () => {
    const w = slideWidthRef.current || 0;

    posRef.current = Math.max(0, posRef.current - w);

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
  };

  const goNext = () => {
    const w = slideWidthRef.current || 0;

    posRef.current += w;

    const lw = w * slides.length;

    if (posRef.current >= lw) {
      posRef.current -= lw;
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="page-shell">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            Testimonials
          </p>

          <h2 className="font-serif text-4xl font-semibold text-[var(--color-text)]">
            Trusted by project buyers
          </h2>
        </div>

        {loading ? (
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-8 text-sm text-[var(--color-text-muted)]">
            Loading testimonials...
          </div>
        ) : (
          <div className="relative">
            <div ref={containerRef} className="overflow-hidden w-full">
              <div ref={trackRef} className="flex">
                {[...slides, ...slides].map((t, i) => (
                  <article
                    key={`${t.id ?? i}-dup`}
                    className="flex-shrink-0 w-full md:w-1/2 px-1 sm:px-2"
                  >
                    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-w-sm mx-auto">
                      <Quote
                        size={18}
                        className="text-[var(--color-primary)]/45"
                      />

                      <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                        {t.testimonial_text}
                      </p>

                      <div className="mt-3 flex items-center gap-2 border-t border-[var(--color-border)] pt-2">
                        {!isPlaceholder && t.image_url ? (
                          <img
                            src={t.image_url}
                            alt={t.client_name}
                            width="24"
                            height="24"
                            loading="lazy"
                            decoding="async"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex w-6 h-6 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-xs font-semibold text-[var(--color-accent)]">
                            {t.client_name?.[0] ?? "W"}
                          </div>
                        )}

                        <div>
                          <p className="text-xs font-semibold text-[var(--color-text)]">
                            {t.client_name}
                          </p>

                          {!isPlaceholder && t.company && (
                            <p className="text-[10px] text-[var(--color-text-muted)]">
                              {t.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
            >
              ‹
            </button>

            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
            >
              ›
            </button>

            <div className="mt-4 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const w = slideWidthRef.current || 0;

                    posRef.current = i * w;

                    if (trackRef.current) {
                      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
                    }

                    setActive(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 w-6 rounded-full ${
                    i === active
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-border)]/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
