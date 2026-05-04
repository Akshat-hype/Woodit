import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import { WHATSAPP_LINK } from '../../utils/constants';
import Button from '../components/common/Button';

const AboutSection = () => (
  <section className="py-24 bg-[var(--color-background)]">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--color-primary)]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary)] font-medium">About WoodIt</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)] leading-tight mb-6">
            Rooted in Craft.<br />Built for the World.
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
            WoodIt is a Jodhpur-based furniture manufacturer creating handcrafted pieces for global spaces where design, durability, and detail come together.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8">
            At WoodIt, every piece begins with a simple belief — furniture should not just fill a space, it should belong to it. Rooted in Jodhpur's legacy of craftsmanship, we work closely with skilled artisans who understand wood, material, and form at a deeper level.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Real Wood', desc: 'Solid wood, metal, rope & leather' },
              { label: 'B2B Focused', desc: 'Hotels, resorts & global buyers' },
              { label: 'Export Quality', desc: 'Standards that meet the world' },
              { label: 'Jodhpur Craft', desc: 'Legacy artisanship at the core' },
            ].map(item => (
              <div key={item.label} className="bg-white border border-[var(--color-border)] rounded-sm p-4">
                <p className="text-sm font-semibold text-[var(--color-text)] mb-1">{item.label}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — decorative */}
        <div className="relative hidden lg:flex items-center justify-center h-[480px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/8 to-transparent rounded-sm" />
          <div className="relative z-10 text-center px-12">
            <blockquote className="font-serif text-2xl text-[var(--color-text)] italic leading-relaxed mb-6">
              "We don't believe in fast furniture. We believe in pieces that hold their strength, their finish, and their character over time."
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-[var(--color-primary)]" />
              <span className="text-xs text-[var(--color-primary)] uppercase tracking-widest">WoodIt Exportz</span>
              <div className="w-8 h-px bg-[var(--color-primary)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CatalogueCTA = () => (
  <section className="py-24 bg-[#111]">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 h-px bg-[var(--color-primary-light)]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-light)] font-medium">Full Collection</span>
          <div className="w-8 h-px bg-[var(--color-primary-light)]" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4">
          Download Our Catalogue
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Get the full WoodIt Exportz product catalogue with all collections, material specifications, and design finishes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">Download Catalogue</Button>
          <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-[var(--color-text)]">
              Talk to Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => (
  <div>
    <Hero />
    <AboutSection />
    <Categories />
    <FeaturedProducts />
    <Testimonials />
    <CatalogueCTA />
  </div>
);

export default Home;