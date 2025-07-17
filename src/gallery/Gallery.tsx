import React from 'react';
import './Gallery.css';
import Cover from '../cover/Cover';
import Daredevil from '../cover/images/daredevil-cover.jpg';
import MyNameIsEarl from '../cover/images/my-name-is-earl.jpg';
import Ozark from '../cover/images/ozark.jpg';
import SweetHome from '../cover/images/sweet-home.jpg';
import TheMentalist from '../cover/images/the-mentalist.jpg';
import Westworld from '../cover/images/westworld.jpg';

const Gallery: React.FC = () => {
  return (
    <div className="gallery">
      <div className="gallery-row">
        <Cover
          image={Daredevil}
          title="Daredevil"
          description="Action | Crime | Drama"
        />
        <Cover
          image={MyNameIsEarl}
          title="My Name Is Earl"
          description="Comedy"
        />
        <Cover
          image={Ozark}
          title="Ozark"
          description="Crime | Drama | Thriller"
        />
      </div>
      <div className="gallery-row">
        <Cover
          image={SweetHome}
          title="Sweet Home"
          description="Action | Drama | Horror"
        />
        <Cover
          image={TheMentalist}
          title="The Mentalist"
          description="Crime | Drama | Mystery"
        />
        <Cover
          image={Westworld}
          title="Westworld"
          description="Drama | Mystery | Sci-Fi"
        />
      </div>
    </div>
  );
};

export default Gallery;