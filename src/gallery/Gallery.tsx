import React from 'react';
import './Gallery.css';
import Cover from '../cover/Cover';
import getGallery from './gallery-get';

const Gallery: React.FC = () => {
  return (
    <div className="gallery">
      {getGallery().map(cover => (
        <Cover
          image={cover.image}
          id={cover.id}
          title={cover.title}
          description={cover.description}
          key={cover.id}
        />
      ))}
    </div>
  );
};

export default Gallery;
