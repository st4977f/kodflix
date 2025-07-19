import React from 'react';
import './Gallery.css';
import Cover from './cover/Cover';
import Loading from '../common/loading/loading';

interface Show {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface GalleryState {
  shows: Show[];
}

class Gallery extends React.Component<{}, GalleryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shows: [],
    };
  }

  componentDidMount() {
    fetch('/rest/shows')
      .then((response) => response.json())
      .then((shows: Show[]) => {
        this.setState({ shows });
      });
  }

  render() {
    return (
      <div className="gallery">
        {this.state.shows.length ? (
          this.state.shows.map((show) => (
            <Cover
              key={show.id}
              id={show.id}
              title={show.title}
              description={show.description}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Gallery;
