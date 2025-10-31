import React, { useState, useContext } from 'react';
import logo from '../assets/logo/logo.png';
import { toast } from 'react-toastify';
import RegisterPage from '../pages/RegisterPage';
import { useNavigate } from 'react-router-dom';
import api from '../service/api'; // { } වරහන් දෙක අයින් කරන්න
import { AuthContext } from '../context/AuthContext';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      // Use 'api' which automatically adds the token later
      const response = await api.post('http://localhost:8080/api/auth/login', loginData);

      // The response.data will have { token, user }
      login(response.data);

      toast.success('Login Successful! Welcome back.');
      setTimeout(() => {
        navigate('/');
      }, 1000); 

    } catch (err) {
      const errorMessage = err.response?.data || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="SavoryHub" className="logo-img" />
        <h1 className="title">SavoryHub</h1>
        <p className="subtitle">Welcome back! Please login to your account.</p>

        <div className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="row between">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a className="link" href="#forgot">Forgot password?</a>
          </div>

          <button className="primary wide" type="submit" onClick={handleSubmit}>Sign In</button>
        </div>

        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="socials">
          <button className="btn social icon google" aria-label="Continue with Google">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
              <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853" />
              <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" />
            </svg>
          </button>
          <button className="btn social icon facebook" aria-label="Continue with Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          <button className="btn social icon apple" aria-label="Continue with Apple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </button>
        </div>

        <p className="footer-text">
          Don't have an account? <a className="link" href="/register">Sign up</a>
        </p>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .auth-page {
          height: 100dvh; /* avoid extra scroll on mobile/desktop */
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #ffffff;
          overflow: hidden; /* hide any stray scrollbars */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 24px;
          padding: 48px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.5s ease;
          max-height: calc(100dvh - 40px); /* ensure card fits within viewport */
          overflow: auto; /* allow internal scroll if content exceeds */
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo-img { width: 72px; height: 72px; object-fit: contain; display: block; margin: 0 auto 10px; }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
          text-align: center;
        }

        .subtitle {
          color: #718096;
          font-size: 15px;
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
        }

        .auth-form input[type="email"],
        .auth-form input[type="password"] {
          padding: 14px 16px;
          font-size: 15px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          width: 100%;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .auth-form input[type="email"]:focus,
        .auth-form input[type="password"]:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: -8px 0 8px 0;
        }

        .row.between {
          justify-content: space-between;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }

        .remember input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #667eea;
        }

        .link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        .primary.wide {
          width: 100%;
          padding: 14px;
          background: #f97316;
          color: white;
     
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px #f04e76;
        }

        .primary.wide:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px #f04e76;
        }

        .primary.wide:active {
          transform: translateY(0);
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 32px 0 24px 0;
          color: #a0aec0;
          font-size: 13px;
          font-weight: 600;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }

        .divider span {
          padding: 0 16px;
        }

        .socials {
          display: flex;
          flex-direction: row; 
          justify-content: center; 
          gap: 24px;
          margin-bottom: 24px;
        }

        .row-icons { flex-direction: row; justify-content: center; gap: 24px; margin: 12px 10px 28px 0; }
        .btn.social.icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: 2px solid #e2e8f0;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        cursor: pointer;}
        .btn.social.icon:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .btn.social.icon.facebook { background: #1877f2; border-color: #1877f2; }
        .btn.social.icon.apple { background: #000; border-color: #000; }

        .footer-text {
          text-align: center;
          color: #718096;
          font-size: 14px;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 32px 24px;
          }

          .title {
            font-size: 28px;
          }

          .subtitle {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;