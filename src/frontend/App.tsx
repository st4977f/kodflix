import React, { useEffect } from 'react';
import './App.css';
import ReactGA from 'react-ga4';
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from './common/menu/Menu';
import Gallery from './gallery/Gallery';
import Details from './details/Details';
import NotFound from './not-found/NotFound';

ReactGA.initialize('G-S0QWF7JB8N');

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search + location.hash });
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <GAListener />
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/:showId" element={<Details />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for unknown routes */}
        </Routes>
      </div>
    </>
  );
}

export default App;
