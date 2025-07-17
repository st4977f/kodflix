import React from 'react';
import './App.css';
import Daredevil from './daredevil-cover.jpg';
import MyNameIsEarl from './my-name-is-earl.jpg';
import Ozark from './ozark.jpg';
import SweetHome from './sweet-home.jpg';
import TheMentalist from './the-mentalist.jpg';
import Westworld from './westworld.jpg';

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
