import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo/logo.png';

function Layout({ children }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        /* --- Navbar --- */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          padding: 14px 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-logo {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          object-fit: contain;
        }

        .nav-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #f97316;
        }

        .nav-center {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .search-bar {
          width: 60%;
          max-width: 500px;
          padding: 10px 18px;
          border-radius: 25px;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-bar:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.2);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
          border-left: 1px solid #e5e7eb;
          padding-left: 16px;
        }

        .nav-links a {
          text-decoration: none;
          color: #374151;
          font-weight: 500;
          transition: 0.3s;
          padding: 0 8px;
        }

        .nav-links a:hover, .nav-links a.active {
          color: #f97316;
        }

        .nav-user {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 50px;
          padding: 6px 14px;
          transition: all 0.2s ease;
        }

        .nav-user:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .nav-user img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f3f4f6;
          cursor: pointer;
        }

        .nav-user img:hover {
          transform: scale(1.1);
          box-shadow: 0 0 8px rgba(0,0,0,0.2);
          }

        .nav-user .user-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: #374151;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .nav-btn {
          background: #f97316;
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-btn:hover {
          background: #ea580c;
        }

        /* Main content & Footer */
        .app-main { padding: 20px 40px; }
        .app-footer {
          text-align: center;
          padding: 20px;
          background: #f9fafb;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
          font-size: 0.9rem;
          margin-top: 30px;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 12px 20px;
          }

          .nav-center {
            justify-content: stretch;
          }

          .search-bar {
            width: 100%;
          }

          .nav-right {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .nav-links {
            border-left: none;
            padding-left: 0;
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>

      {/* Navbar */}
      {!window.location.pathname.startsWith('/login') &&
        !window.location.pathname.startsWith('/register') && (
          <nav className="navbar">
            {/* Left: Logo + title */}
            <div className="nav-left">
              <img src={logo} alt="SavoryHub" className="nav-logo" />
              <h1 className="nav-title">SavoryHub</h1>
            </div>

            {/* Center: Search */}
            <div className="nav-center">
              <input
                type="text"
                placeholder="Search foods, categories..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Right: Home | Categories | Cart | User */}
            <div className="nav-right">
              <div className="nav-links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/categories">Categories</NavLink>
                <NavLink to="/cart">Cart</NavLink>
              </div>

              {isAuthenticated && (
                <div className="nav-user">
                  <img
                    src={user?.profileImage || logo}
                    alt="Profile"
                    onClick={() => navigate('/profile')}
                  />
                  <span className="user-name">{user?.email}</span>
                  <button className="nav-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        © {new Date().getFullYear()} SavoryHub. All Rights Reserved.
      </footer>
    </>
  );
}

export default Layout;
