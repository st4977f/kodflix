import React, { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

export default function Login() {

  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  // Animation classes
  const loginFormRef = useRef<HTMLFormElement>(null);
  const loginActive = activeForm === 'login' ? 'form-wrapper is-active' : 'form-wrapper';
  const registerActive = activeForm === 'register' ? 'form-wrapper is-active' : 'form-wrapper';

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    // Minimum standards for login
    if (loginUsername.length < 3) {
      setLoginError('Username must be at least 3 characters');
      return;
    }
    if (loginPassword.length < 6) {
      setLoginError('Password must be at least 6 characters');
      return;
    }
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token);
        window.dispatchEvent(new Event('loginStateChanged'));
        setLoginSuccess('Login successful!');
        setIsLoggedIn(true);
        navigate('/manage/tv-shows');
      } else {
        setLoginError(data.error || 'Login failed');
        if (loginFormRef.current) {
          loginFormRef.current.classList.add('shake');
          setTimeout(() => {
            loginFormRef.current && loginFormRef.current.classList.remove('shake');
          }, 500);
        }
      }
    } catch (err) {
      setLoginError('Network error');
      if (loginFormRef.current) {
        loginFormRef.current.classList.add('shake');
        setTimeout(() => {
          loginFormRef.current && loginFormRef.current.classList.remove('shake');
        }, 500);
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    // Minimum standards for registration
    if (registerUsername.length < 3) {
      setRegisterError('Username must be at least 3 characters');
      return;
    }
    if (registerPassword.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }
    if (!registerUsername || !registerEmail || !registerPassword || !registerPasswordConfirm) {
      setRegisterError('Please fill all fields');
      return;
    }
    if (registerPassword !== registerPasswordConfirm) {
      setRegisterError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: registerUsername, email: registerEmail, password: registerPassword })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token);
        window.dispatchEvent(new Event('loginStateChanged'));
        setRegisterError('');
        setIsLoggedIn(true);
        navigate('/manage/tv-shows');
      } else {
        setRegisterError(data.error || 'Registration failed');
      }
    } catch (err) {
      setRegisterError('Network error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUsername('');
    setLoginPassword('');
    localStorage.removeItem('jwt');
    window.dispatchEvent(new Event('loginStateChanged'));
    navigate('/login');
  };
  // Persist login state on reload if JWT exists
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-login" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <section className="forms-section">
        <div className="forms">
          <div className={loginActive}>
            <button
              type="button"
              className="switcher switcher-login"
              onClick={() => setActiveForm('login')}
            >
              Login
              <span className="underline"></span>
            </button>
            <form ref={loginFormRef} className="login-form form form-login" onSubmit={handleLoginSubmit}>
              <fieldset>
                <legend>Please, enter your username and password for login.</legend>
                <div className="input-block">
                  <label htmlFor="login-username">Username</label>
                  <input
                    id="login-username"
                    type="text"
                    value={loginUsername}
                    onChange={e => setLoginUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </fieldset>
              {loginError && <div className="login-error">{loginError}</div>}
              {loginSuccess && <div className="login-success">{loginSuccess}</div>}
              <button type="submit" className="btn-login">Login</button>
            </form>
          </div>
          <div className={registerActive}>
            <button
              type="button"
              className="switcher switcher-signup"
              onClick={() => setActiveForm('register')}
            >
              Register
              <span className="underline"></span>
            </button>
            <form className="login-form form form-signup" onSubmit={handleRegisterSubmit}>
              <fieldset>
                <legend>Please, enter your username, email, password and password confirmation for registration.</legend>
                <div className="input-block">
                  <label htmlFor="register-username">Username</label>
                  <input
                    id="register-username"
                    type="text"
                    value={registerUsername}
                    onChange={e => setRegisterUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="register-email">Email</label>
                  <input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={e => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="register-password">Password</label>
                  <input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="register-password-confirm">Confirm Password</label>
                  <input
                    id="register-password-confirm"
                    type="password"
                    value={registerPasswordConfirm}
                    onChange={e => setRegisterPasswordConfirm(e.target.value)}
                    required
                  />
                </div>
              </fieldset>
              {registerError && <div className="login-error">{registerError}</div>}
              <button type="submit" className="btn-login">Register</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
