import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { CATEGORIES, CONTACT, FINAL_BRAND_LINE, WHATSAPP_LINK } from '../../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-[#171310] text-white">
      <div className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <span className="font-serif text-3xl font-bold">
              Wood<span className="text-[var(--color-primary-light)]">It</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/62">
              Jodhpur-based furniture makers creating durable, handcrafted pieces for global spaces.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--color-primary-light)]">{FINAL_BRAND_LINE}</p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">Collections</h4>
            <ul className="grid gap-2.5">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="text-sm text-white/62 transition-colors hover:text-white">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">More</h4>
            <ul className="grid gap-2.5">
              {CATEGORIES.slice(4).map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="text-sm text-white/62 transition-colors hover:text-white">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-sm text-white/62 transition-colors hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">Contact</h4>
            <ul className="grid gap-3.5">
              <li>
                <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 text-sm text-white/62 transition-colors hover:text-white">
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2.5 text-sm text-white/62 transition-colors hover:text-white">
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/62">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {CONTACT.location}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/62">
                <Clock size={15} className="mt-0.5 shrink-0" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {CONTACT.businessName}. All rights reserved.</p>
          <p>Jodhpur, Rajasthan, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
