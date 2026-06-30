import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../../../assets/images/Logo 800 x 300px.webp";
import { CATEGORIES } from "../../../utils/constants";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/categories" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="page-shell">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <img src={logo} alt="WoodIt" width="48" height="48" className="h-12 w-12" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[var(--color-primary-dark)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                Catalogue
                <ChevronDown
                  size={15}
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full w-72 pt-3">
                  <div className="rounded-md border border-[var(--color-border)] bg-white p-2 shadow-xl">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className="block rounded-sm px-3 py-2.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <Link
            to="/contact"
            className="hidden rounded-sm bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26594c] sm:inline-flex lg:ml-2"
          >
            Get in Touch
          </Link>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text)] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100svh-64px)] overflow-y-auto border-t border-[var(--color-border)] bg-white lg:hidden">
          <div className="page-shell py-5">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  onClick={closeMenu}
                  className="rounded-sm px-1 py-3 text-base font-medium text-[var(--color-text)]"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-4 border-t border-[var(--color-border)] pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Collections
              </p>
              <div className="grid gap-1 sm:grid-cols-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={closeMenu}
                    className="rounded-sm py-2.5 text-sm text-[var(--color-text-muted)]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
