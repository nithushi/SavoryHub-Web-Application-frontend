import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo.png';

function Layout({ children }) {
  return (
    <>
      <style>{`
        .app-footer {
          width: 100%;
          background: #ffffff; /* full white background */
          color: #111827;
          margin-top: 100px;
          font-family: 'Segoe UI', sans-serif;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 40px;
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr;
          gap: 60px;
        }

        /* Brand Section */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-logo {
          width: 50px;
          height: 50px;
          object-fit: contain;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .footer-logo:hover {
          transform: rotate(-10deg) scale(1.05);
        }

        .footer-brand h3 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #f97316;
          margin: 0;
        }

        .footer-brand p {
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          color: #6b7280;
        }

        .footer-social {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        .footer-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #fff;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .footer-social a:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        /* Quick Links */
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links h4,
        .footer-contact h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #111827;
        }

        .footer-links a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.95rem;
          padding: 6px 0;
          position: relative;
          transition: all 0.3s ease;
        }

        .footer-links a::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 4px;
          width: 0;
          height: 2px;
          background: #f97316;
          transition: width 0.3s ease;
        }

        .footer-links a:hover {
          color: #f97316;
          padding-left: 6px;
        }

        .footer-links a:hover::before {
          width: 24px;
        }

        /* Contact Info */
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 0;
          color: #6b7280;
          transition: all 0.3s ease;
        }

        .footer-contact-item:hover {
          color: #f97316;
          transform: translateX(4px);
        }

        .footer-contact-icon {
          font-size: 1.2rem;
          min-width: 24px;
        }

        /* Footer Bottom */
        .footer-bottom {
          padding: 24px 40px;
          max-width: 1280px;
          margin: 40px auto 0 auto;
          text-align: center;
          color: #9ca3af;
          font-size: 0.9rem;
        }

        .footer-bottom strong {
          color: #f97316;
          font-weight: 600;
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            padding: 48px 30px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 20px;
          }

          .footer-bottom {
            padding: 20px;
          }
        }
      `}</style>

      <footer className="app-footer">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <img src={logo} alt="SavoryHub" className="footer-logo" />
              <h3>SavoryHub</h3>
            </div>
            <p>Delicious meals delivered to your doorstep with love and care.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>Matara, Sri Lanka</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📞</span>
              <span>+94 77 123 4567</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉️</span>
              <span>support@savoryhub.com</span>
            </div>
          </div>
        </div>
      </footer>

      {children}
    </>
  );
}

export default Layout;
