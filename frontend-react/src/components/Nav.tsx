import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/fun", label: "Fun" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="portfolio-nav">
      <header>
        <div className="nav-wrap">
          <Link className="nav-brand" to="/" onClick={() => setSheetOpen(false)}>
            JL • Portfolio
          </Link>
          <nav aria-label="Primary">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? "active" : "")}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button type="button" className="nav-burger" aria-label="Menu" aria-expanded={sheetOpen} onClick={() => setSheetOpen((v) => !v)}>
            <span className="nav-lines" />
          </button>
        </div>
      </header>
      <div className={`nav-sheet ${sheetOpen ? "show" : ""}`} aria-hidden={!sheetOpen} onClick={() => setSheetOpen(false)}>
        <div className="nav-panel" role="menu" onClick={(e) => e.stopPropagation()}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setSheetOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
