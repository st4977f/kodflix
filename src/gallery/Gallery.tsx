import React from 'react';
import './Gallery.css';
import Cover from './cover/Cover';
import getShows from '../shows';

class Gallery extends React.Component {
  render() {
    return (
      <div className="gallery">
        {getShows().map((show) => (
          <Cover
            image={show.image}
            id={show.id}
            title={show.title}
            description={show.description}
            key={show.id}
          />
        ))}
      </div>
    );
  }
}

export default Gallery;
