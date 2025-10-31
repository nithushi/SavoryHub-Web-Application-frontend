import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo/logo.png';
import cartIcon from '../assets/cart.png';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation(); // Use React Router's location hook
  const { user, isAuthenticated, logout, cartItems = [] } = useContext(AuthContext); // <-- cartItems වලට default value එකක් දුන්නා
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate the total number of items in the cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    // Check if the Enter key was pressed
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}`);

      setSearchTerm('');
    }
  };

  const profileImageUrl = user?.profileImage
    ? `http://localhost:8080${user.profileImage}`
    : logo;

  // Determine if the current page is a login or register page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

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
          text-decoration: none; /* Applied to the Link wrapper */
        }
        .nav-logo { width: 46px; height: 46px; border-radius: 12px; object-fit: contain; }
        .nav-title { font-size: 1.6rem; font-weight: 700; color: #f97316; margin: 0; }

        .nav-center { flex: 1; display: flex; justify-content: center; }
        .search-bar { width: 60%; max-width: 500px; padding: 10px 18px; border-radius: 25px; border: 1.5px solid #e5e7eb; background: #f9fafb; font-size: 1rem; outline: none; transition: all 0.3s ease; }
        .search-bar:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.2); }

        .nav-right { display: flex; align-items: center; gap: 20px; }
        .nav-links { display: flex; align-items: center; gap: 12px; border-left: 1px solid #e5e7eb; padding-left: 16px; }
        .nav-links a { text-decoration: none; color: #374151; transition: 0.3s; padding: 0 8px; }
        .nav-links a:hover, .nav-links a.active { color: #f97316; } 

        /* --- Cart Button with Badge --- */
        .cart-link {
          position: relative;
        }
        .cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background-color: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          border: 2px solid white;
        }

        .cart-icon {
          height: 26px; /* size එක 28px සිට 24px වලට අඩු කළා */
          transition: transform 0.2s ease;
          margin-top: 10px;
        }

        /* --- User Section --- */
        .nav-user { display: flex; align-items: center; gap: 12px; background: #ffffff; border: 1.5px solid #e5e7eb; border-radius: 50px; padding: 6px 14px; transition: all 0.2s ease; }
        .nav-user:hover { background: #f9fafb; border-color: #d1d5db; }
        .nav-user img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid #f3f4f6; cursor: pointer; transition: all 0.2s ease; }
        .nav-user img:hover { transform: scale(1.1); box-shadow: 0 0 8px rgba(0,0,0,0.2); }
        .nav-user .user-name { font-size: 0.95rem; font-weight: 500; color: #374151; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .nav-btn { background: #f97316; color: white; padding: 6px 14px; border-radius: 20px; text-decoration: none; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s ease; }
        .nav-btn:hover { background: #ea580c; }

        /* Main content & Footer */
        .app-main { padding: 20px 40px; }
        .app-footer { text-align: center; padding: 20px; background: #fff; color: #6b7280; border-top: 1px solid #e5e7eb; font-size: 0.9rem; margin-top: 30px; }

        /* Responsive Design */
        @media (max-width: 1024px) { .search-bar { width: 70%; } }
        @media (max-width: 768px) {
          .navbar { flex-direction: column; align-items: stretch; gap: 12px; padding: 12px 20px; }
          .nav-left { justify-content: center; }
          .nav-center { justify-content: stretch; }
          .search-bar { width: 100%; }
          .nav-right { flex-direction: column; align-items: center; gap: 12px; }
          .nav-links { border-left: none; padding-left: 0; flex-wrap: wrap; gap: 10px; justify-content: center; }
        }
        @media (max-width: 480px) {
          .nav-title { font-size: 1.3rem; }
          .nav-user .user-name { font-size: 0.85rem; max-width: 100px; }
          .nav-btn { padding: 5px 12px; font-size: 0.85rem; }
        }
      `}</style>

      {/* Conditionally render Navbar and Footer */}
      {!isAuthPage && (
        <nav className="navbar">
          <Link to="/" className="nav-left">
            <img src={logo} alt="SavoryHub" className="nav-logo" />
            <h1 className="nav-title">SavoryHub</h1>
          </Link>

          <div className="nav-center">
            <input
              type="text"
              placeholder="Search foods, categories..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="nav-right">
            <div className="nav-links">
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/products">Categories</NavLink>

              {/* --- UPDATED CART LINK --- */}
              <NavLink to="/cart" className="cart-link">
                {/* 'Cart' කියන වචනය වෙනුවට img tag එකක් දැම්මා */}
                <img src={cartIcon} alt="Shopping Cart" className="cart-icon" />
                {totalCartItems > 0 && (
                  <span className="cart-badge">{totalCartItems}</span>
                )}
              </NavLink>
            </div>

            {isAuthenticated ? (
              <div className="nav-user">
                {user?.role === 'ADMIN' && (
                  <NavLink to="/admin" className="nav-btn admin-btn">Admin</NavLink>
                )}
                <img
                  src={profileImageUrl || logo}
                  alt="Profile"
                  onClick={() => navigate('/profile')}
                />
                <span className="user-name">{user?.email}</span>
                <button className="nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="nav-btn">Login</NavLink>
            )}
          </div>
        </nav>
      )}

      <main className="app-main">{children}</main>

      {!isAuthPage && (
        <footer className="app-footer">
          © {new Date().getFullYear()} SavoryHub. All Rights Reserved.
        </footer>
      )}
    </>
  );
}

