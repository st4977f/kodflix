import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './gallery/Gallery';
import Details from './details/Details';
import NotFound from './not-found/NotFound';

class App extends React.Component {
  render() {
    return (
      <Router>
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
}

export default App;
