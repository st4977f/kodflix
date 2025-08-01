import React, { useEffect } from 'react';
import './App.css';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Gallery from './gallery/Gallery';
import Details from './details/Details';
import NotFound from './not-found/NotFound';

ReactGA.initialize('G-S0QWF7JB8N');

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search + location.hash);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <GAListener />
      <div className="App">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/:showId" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
