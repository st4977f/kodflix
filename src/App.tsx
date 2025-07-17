import React from 'react';
import './App.css';
import Daredevil from './covers/daredevil-cover.jpg';
import MyNameIsEarl from './covers/my-name-is-earl.jpg';
import Ozark from './covers/ozark.jpg';
import SweetHome from './/covers/sweet-home.jpg';
import TheMentalist from './covers/the-mentalist.jpg';
import Westworld from './covers/westworld.jpg';

function App() {
  return (
    <div className="App">
      <div className="image-cover-row">
        <div className="image-cover-row-item">
          <img
            src={Daredevil}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
        </div>
        <div className="image-cover-row-item">
          <img
            src={MyNameIsEarl}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
        </div>
        <div className="image-cover-row-item">
          <img
            src={Ozark}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
        </div>
      </div>
      <div className="image-cover-row">
        <div className="image-cover-row-item">
          <img
            src={SweetHome}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
        </div>
        <div className="image-cover-row-item">
          <img
            src={TheMentalist}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
        </div>
        <div className="image-cover-row-item">
          <img
            src={Westworld}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
