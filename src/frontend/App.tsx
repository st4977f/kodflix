import React, { useEffect } from 'react';
import './App.css';
import ReactGA from 'react-ga4';
import { Routes, Route, useLocation } from 'react-router-dom';
import Play from './play/Play';
import Menu from './common/menu/Menu';
import Gallery from './gallery/Gallery';
import Details from './details/Details';
import NotFound from './not-found/NotFound';
import ManageTvShows from './manage-tv-shows/ManageTvShows';
import AdminShows from './admin-tv-shows/AdminShows';
import Login from './login/Login';

ReactGA.initialize('G-S0QWF7JB8N');

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('jwt'));
  useEffect(() => {
    const updateLoginState = () => setIsLoggedIn(!!localStorage.getItem('jwt'));
    window.addEventListener('storage', updateLoginState);
    window.addEventListener('loginStateChanged', updateLoginState);
    return () => {
      window.removeEventListener('storage', updateLoginState);
      window.removeEventListener('loginStateChanged', updateLoginState);
    };
  }, []);

  // Helper to check if user is admin
  function isAdmin() {
    const token = localStorage.getItem('jwt');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin';
    } catch {
      return false;
    }
  }

  return (
    <>
      <GAListener />
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/manage/tv-shows" element={isLoggedIn ? <ManageTvShows /> : <LoginRedirect />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/login" element={isLoggedIn ? <ManageRedirect /> : <Login />} />
          <Route path="/:showId" element={<Details />} />
          <Route path="/:showId/play" element={<Play />} />
          <Route path="/admin/tv-shows/*" element={isAdmin() ? <AdminShows /> : <NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
// Redirect to /login if not logged in
function LoginRedirect() {
  const navigate = useLocation();
  useEffect(() => {
    // Use React navigation to avoid reload loop
    (window as any).navigate && (window as any).navigate('/login');
  }, [navigate]);
  return null;
}

// Redirect to /manage/tv-shows if logged in
function ManageRedirect() {
  const navigate = useLocation();
  useEffect(() => {
    (window as any).navigate && (window as any).navigate('/manage/tv-shows');
  }, [navigate]);
  return null;
}
}

export default App;
