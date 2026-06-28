import { Link, useLocation } from "react-router-dom";
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

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-3 sm:px-6">
      <nav
        className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-xl px-4 py-2.5 shadow-[var(--shadow-soft)] sm:px-5"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <Link to="/" className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Kumudh T
        </Link>

        {location.pathname === "/" && (
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.to}>
                <a
                  href={link.to}
                  className="rounded-lg px-3 py-1.5 text-[13px] transition-colors hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
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
    </header>
  );
}
