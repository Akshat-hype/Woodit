import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, FINAL_BRAND_LINE, WHATSAPP_LINK } from '../../utils/constants';
import Button from '../components/common/Button';

const Contact = () => {
  return (
    <main>
      <section className="bg-[#171310] py-16 text-white sm:py-20">
        <div className="page-shell">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-light)]">Contact</p>
          <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">Start a furniture inquiry</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            Share your project type, product interest, or catalogue requirement. WoodIt can support hospitality, commercial, and custom furniture needs.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-md border border-[var(--color-border)] bg-white p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-semibold">{CONTACT.businessName}</h2>
            <div className="mt-7 grid gap-5 text-sm text-[var(--color-text-muted)]">
              <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer" className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-[var(--color-primary)]" />
                <span>{CONTACT.phone}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-[var(--color-primary)]" />
                <span>{CONTACT.email}</span>
              </a>
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-[var(--color-primary)]" />
                <span>{CONTACT.location}</span>
              </p>
              <p className="flex items-start gap-3">
                <MessageCircle size={18} className="mt-0.5 text-[var(--color-primary)]" />
                <span>{CONTACT.hours}</span>
              </p>
            </div>
            <div className="mt-8 border-t border-[var(--color-border)] pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Socials</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CONTACT.socials.map((social) => (
                  <span key={social} className="rounded-sm bg-[var(--color-background)] px-3 py-1.5 text-xs text-[var(--color-text-muted)]">
                    {social}
                  </span>
                ))}
              </div>
            </div>
            <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer" className="mt-8 block">
              <Button className="w-full bg-[var(--color-accent)] hover:bg-[#26594c]">
                <MessageCircle size={18} />
                Contact on WhatsApp
              </Button>
            </a>
          </div>

          <form className="rounded-md border border-[var(--color-border)] bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">Name</span>
                <input className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">Phone</span>
                <input className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">Project / Product Interest</span>
                <input className="mt-2 w-full rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">Message</span>
                <textarea className="mt-2 min-h-36 w-full resize-y rounded-sm border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
              </label>
            </div>
            <Button type="button" className="mt-6 w-full sm:w-auto">
              Submit Inquiry
            </Button>
          </form>
        </div>
        <p className="page-shell mt-10 text-center text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          {FINAL_BRAND_LINE}
        </p>
      </section>
    </main>
  );
};

export default Contact;
