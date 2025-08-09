import React, { useState } from 'react';
import './Login.scss';

export default function Login() {
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  // Register state
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Animation classes
  const loginActive = activeForm === 'login' ? 'form-wrapper is-active' : 'form-wrapper';
  const registerActive = activeForm === 'register' ? 'form-wrapper is-active' : 'form-wrapper';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginUsername === 'admin' && loginPassword === 'password') {
      alert('Login successful!');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    if (!registerUsername || !registerEmail || !registerPassword || !registerPasswordConfirm) {
      setRegisterError('Please fill all fields');
      return;
    }
    if (registerPassword !== registerPasswordConfirm) {
      setRegisterError('Passwords do not match');
      return;
    }
    alert('Registration successful!');
  };

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
            <form className="login-form form form-login" onSubmit={handleLoginSubmit}>
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
