import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { to: "/#about", label: "About" },
  { to: "/#skills", label: "Skills" },
  { to: "/#experience", label: "Experience" },
  { to: "/#projects", label: "Projects" },
  { to: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-3 sm:px-6">
      <nav
        className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-xl px-4 py-2.5 shadow-[var(--shadow-soft)] sm:px-5"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <Link to="/" className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Kumud T
        </Link>

        {location.pathname === "/" && (
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.to}>
                <a
                  href={link.to}
                  className="rounded-lg px-3 py-1.5 text-[15px] transition-colors hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {location.pathname === "/" && (
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)] md:hidden"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        )}

        {location.pathname !== "/" && (
          <Link
            to="/"
            className="text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            ← Back to home
          </Link>
        )}

        <ThemeToggle />
      </nav>

      {location.pathname === "/" && menuOpen && (
        <ul className="glass-strong mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-xl p-2 shadow-[var(--shadow-soft)] md:hidden">
          {LINKS.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[15px] transition-colors hover:bg-[var(--bg-glass)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
