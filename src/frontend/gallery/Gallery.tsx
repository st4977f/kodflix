import React from 'react';
import './Gallery.scss';
import Cover from './cover/Cover';
import Loading from '../common/loading/loading';
import fetchData from '../common/fetch';

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
    fetchData('/kodflix/rest/shows')
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
