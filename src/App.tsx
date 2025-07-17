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
          <div className="image-cover-row-item-overlay">
            <h3>Daredevil</h3>
            <p>Action | Crime | Drama</p>
          </div>
        </div>
        <div className="image-cover-row-item">
          <img
            src={MyNameIsEarl}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
          <div className="image-cover-row-item-overlay">
            <h3>My Name Is Earl</h3>
            <p>Comedy</p>
          </div>
        </div>
        <div className="image-cover-row-item">
          <img
            src={Ozark}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
          <div className="image-cover-row-item-overlay">
            <h3>Ozark</h3>
            <p>Crime | Drama | Thriller</p>
          </div>
        </div>
      </div>
      <div className="image-cover-row">
        <div className="image-cover-row-item">
          <img
            src={SweetHome}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
          <div className="image-cover-row-item-overlay">
            <h3>Sweet Home</h3>
            <p>Action | Drama | Horror</p>
          </div>
        </div>
        <div className="image-cover-row-item">
          <img
            src={TheMentalist}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
          <div className="image-cover-row-item-overlay">
            <h3>The Mentalist</h3>
            <p>Crime | Drama | Mystery</p>
          </div>
        </div>
        <div className="image-cover-row-item">
          <img
            src={Westworld}
            alt="Favourite Movie Cover"
            className="image-cover"
          />
          <div className="image-cover-row-item-overlay">
            <h3>Westworld</h3>
            <p>Drama | Mystery | Sci-Fi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
