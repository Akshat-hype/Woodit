import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CATEGORIES, WHATSAPP_LINK, CONTACT } from '../../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-4">
            <span className="font-serif text-3xl font-bold">
              Wood<span className="text-[var(--color-primary-light)]">It</span>
            </span>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              WoodIt Exportz is a Jodhpur-based furniture manufacturer creating handcrafted pieces for global spaces where design, durability, and detail come together.
            </p>
            <p className="mt-6 text-xs text-[var(--color-primary-light)] tracking-widest uppercase">
              Handcrafted in India. Delivered Worldwide.
            </p>
          </div>

          {/* Collections */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">Collections</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">More</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(5).map(cat => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li>
                <a href={WHATSAPP_LINK()} target="_blank" rel="noreferrer"
                  className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                  <Phone size={14} className="mt-0.5 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {CONTACT.location}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <Clock size={14} className="mt-0.5 shrink-0" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} WoodIt Exportz. All rights reserved.</p>
          <p className="text-xs text-gray-600">Jodhpur, Rajasthan, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;