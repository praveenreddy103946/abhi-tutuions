import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/admissions", label: "Admissions" },
  { to: "/demo-tutorials", label: "Demo Tutorials" },
  // { to: "/academics", label: "Academics" },
  // { to: "/news-events", label: "News & Events" },
  // { to: "/gallery", label: "Gallery" },
  // { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Brand */}
        <Link
          to="/"
          className="navbar__brand"
          onClick={() => setMenuOpen(false)}
        >
          <div className="navbar__logo-circle">AT</div>

          <div className="navbar__brand-text">
            <span className="navbar__name">ABHI TUITIONS</span>
            <span className="navbar__tagline">
              Excellence in Education
            </span>
          </div>
        </Link>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <ul
          className={`navbar__links ${
            menuOpen ? "navbar__links--open" : ""
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "navbar__link navbar__link--active"
                    : "navbar__link"
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}

          <li>
            <Link
              to="/admissions"
              className="navbar__cta"
              onClick={() => setMenuOpen(false)}
            >
              Enroll Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}