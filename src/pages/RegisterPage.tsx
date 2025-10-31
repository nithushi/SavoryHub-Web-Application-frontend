import React, { useState } from 'react';
// @ts-ignore - allow importing image asset
import logo from '../assets/logo/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [error, setError] = useState<string>(''); // Step 2: Add state for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // IMPORTANT: Keys here must match your Spring Boot RegisterRequestDTO
    const registrationData = {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
      contact: contact,
    };

    try {
      // Make the API call to your Spring Boot backend's register endpoint
      const response = await axios.post('http://localhost:8080/api/auth/register', registrationData);

      // Handle successful registration
      console.log('Registration successful:', response.data);

      toast.success('Account created successfully! Redirecting to login...');

      // Swal.fire({
      //   title: "Successful!",
      //   text: "Your account has been created successfully.",
      //   icon: "success",
      //   confirmButtonText: "Ok"
      // });


      // Optional: Redirect to login page after successful registration
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setContact('');

        // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2-second delay

    } catch (err: any) {
      // Handle registration errors
      console.error('Registration failed:', err.response?.data);
      // Swal.fire({
      //   title: "Error!",
      //   text: err.response?.data || 'An error occurred. Please try again.',
      //   icon: "error",
      //   confirmButtonText: "Try Again"
      // });
      const errorMessage = err.response?.data || 'An error occurred. Please try again.';

      // Show error toast
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="SavoryHub" className="logo-img" />
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Join SavoryHub to explore delicious foods.</p>

        <form className="auth-form">
          <div className="row two">
            <div className="input-group">
              <label htmlFor="first">First name</label>
              <input id="first" type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="last">Last name</label>
              <input id="last" type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="row two">
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="contact">Contact</label>
              <input id="contact" type="tel" placeholder="07x xxx xxxx" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
          </div>

          {/* {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '-10px', marginBottom: '10px' }}>{error}</p>} */}

          <button className="primary wide" type="submit" onClick={handleSubmit} >Create account</button>
        </form>

        <p className="footer-text">Already have an account? <a className="link" href="/login">Sign in</a></p>
      </div>

      <style>{`
        .auth-page { height: 100dvh; width: 100%; display: flex; align-items: center; justify-content: center; padding: 20px; background: #ffffff; overflow: hidden; }
        .auth-card { width: 100%; max-width: 680px; background: #ffffff; border-radius: 24px; padding: 48px 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); max-height: calc(100dvh - 40px); overflow: auto; }
        .logo-img { width: 72px; height: 72px; object-fit: contain; display: block; margin: 0 auto 10px; }
        .title { font-size: 32px; font-weight: 700; color: #1a202c; margin-bottom: 8px; text-align: center; }
        .subtitle { color: #718096; font-size: 15px; text-align: center; margin-bottom: 24px; }
        .auth-form { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .row.two { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .input-group { display: flex; flex-direction: column; gap: 6px; }
        .input-group label { font-size: 14px; font-weight: 600; color: #2d3748; }
        .auth-form input { padding: 12px 14px; font-size: 15px; border-radius: 12px; border: 2px solid #e2e8f0; width: 100%; font-family: inherit; }
        .primary.wide { width: 100%; padding: 14px; background: #f97316; color: #fff; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all .2s; box-shadow: 0 4px 12px #ecdfe2ff;}
        .primary.wide:hover { transform: translateY(-2px); box-shadow: 0 6px 20px #f04e76; }
        .primary.wide:focus {outline: none;
}
        .divider { display: flex; align-items: center; text-align: center; margin: 24px 0; color: #a0aec0; font-size: 13px; font-weight: 600; }
        .divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid #e2e8f0; }
        .divider span { padding: 0 16px; }
        .socials { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
        .btn.social { width: 100%; padding: 12px 20px; border-radius: 12px; border: 2px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 15px; font-weight: 600; }
        .footer-text { text-align: center; color: #718096; font-size: 14px; }
        @media (max-width: 600px) { .row.two { grid-template-columns: 1fr; } .auth-card { padding: 32px 24px; } }
      `}</style>
    </div>
  );
}


