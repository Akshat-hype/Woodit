import { Link } from 'react-router-dom';
import { WHATSAPP_LINK } from '../../../utils/constants';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0e8dc] via-[#ede0cc] to-[#e5d5bc]" />

      {/* Wood grain texture */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            88deg, transparent, transparent 3px,
            rgba(101,67,33,0.8) 3px, rgba(101,67,33,0.8) 4px
          )`
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-24">
        <div className="max-w-3xl">

          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-[var(--color-primary)]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary)] font-medium">
              Handcrafted in Jodhpur
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold text-[var(--color-text)] leading-[1.05] mb-6">
            Crafted in Wood.<br />
            Made for the <span className="text-[var(--color-primary)] italic">World.</span>
          </h1>

          {/* Supporting line */}
          <p className="text-lg sm:text-xl text-[var(--color-text-muted)] leading-relaxed mb-4 max-w-2xl">
            Export-quality furniture for hospitality, retail, and modern living.
          </p>
          <p className="text-base text-[var(--color-text-muted)]/80 leading-relaxed mb-12 max-w-xl">
            Handcrafted in Jodhpur with precision, durability, and timeless design.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link to="/category/chair-gallery">
              <Button size="lg" className="shadow-sm">View Catalogue</Button>
            </Link>
            <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">Contact on WhatsApp</Button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-12 pt-8 border-t border-[var(--color-primary)]/20">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '8+', label: 'Collections' },
              { value: '100%', label: 'Real Wood' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-serif text-3xl font-semibold text-[var(--color-text)]">{stat.value}</span>
                <span className="text-xs text-[var(--color-text-muted)] mt-1 tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right decorative */}
      <div className="absolute right-0 top-0 h-full w-2/5 hidden lg:flex items-center justify-center pointer-events-none">
        <div className="relative w-[400px] h-[400px]">
          <div className="absolute inset-0 rounded-full border border-[var(--color-primary)]/15" />
          <div className="absolute inset-8 rounded-full border border-[var(--color-primary)]/20" />
          <div className="absolute inset-16 rounded-full border border-[var(--color-primary)]/25" />
          <div className="absolute inset-24 rounded-full bg-[var(--color-primary)]/8" />
        </div>
        {/* Brand line bottom right */}
        <div className="absolute bottom-16 right-16 text-right">
          <p className="text-xs text-[var(--color-text-muted)]/50 tracking-widest uppercase">
            Handcrafted in India.<br />Delivered Worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;