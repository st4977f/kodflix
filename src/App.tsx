import React from 'react';
import './App.css';
import Daredevil from './daredevil-cover.jpg';

function App() {
  return (
    <div className="App">
      <h1>Kodflix</h1>
      <img
        src={Daredevil}
        alt="Favourite Movie Cover"
        className="image-cover"
      />
    </div>
  );
}

export default App;
