import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand Section */}
        <div className="footer__brand">
          <div className="footer__logo-circle">AT</div>

          <h3 className="footer__name">ABHI TUITIONS</h3>

          <p className="footer__desc">
            Empowering students with quality education and personalized guidance
            to achieve academic excellence and lifelong success.
          </p>

          <div className="footer__socials">
            <a href="#!" aria-label="Facebook" className="footer__social">
              f
            </a>
            <a href="#!" aria-label="Instagram" className="footer__social">
              in
            </a>
            <a href="#!" aria-label="YouTube" className="footer__social">
              ▶
            </a>
            <a href="#!" aria-label="Twitter" className="footer__social">
              𝕏
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>

          <ul className="footer__list">
            {[
              ["/", "Home"],
              ["/about", "About Us"],
              //["/academics", "Academics"],
              ["/admissions", "Admissions"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="footer__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="footer__col">
          <h4 className="footer__col-title">Resources</h4>

          <ul className="footer__list">
            {[
              ["/demo-tutorials", "Demo Tutorials"],
             // ["/news-events", "News & Events"],
            // ["/gallery", "Gallery"],
             //  ["/contact", "Contact Us"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="footer__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>

          <ul className="footer__list footer__list--contact">
            <li>123 Education Lane, Knowledge City</li>
            <li>+91 98765 43210</li>
            <li>info@abhituitions.com</li>
            <li>Mon-Sat: 8:00 AM - 7:00 PM</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} ABHI TUITIONS. All rights reserved.
        </p>
        <p>Designed for academic excellence.</p>
      </div>
    </footer>
  );
}