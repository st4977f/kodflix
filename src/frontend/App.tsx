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

ReactGA.initialize('G-S0QWF7JB8N');

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
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
          <Route path="/manage-tv-shows" element={<ManageTvShows />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/:showId" element={<Details />} />
          <Route path="/:showId/play" element={<Play />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
