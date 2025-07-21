import React from 'react';
import { Navigate } from 'react-router-dom';
import './Details.css';
import Loading from '../common/loading/loading';

interface Show {
  id: string;
  title: string;
  synopsis: string;
}

function DetailsContent({ show }: { show: Show }) {
  return (
    <div className='details'>
      <h1>{show.title}</h1>
      <div className='details-content'>
        <h3 className='details-content-synopsis'>{show.synopsis}</h3>
        <div className='details-content-cover'>
          <img src={`../../public/common/images/${show.id}.jpg`} alt={show.title} />
        </div>
      </div>
    </div>
  );
}

export default class Details extends React.Component<{}, { show: Show | null; loading: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      show: null,
      loading: true,
    };
  }

  componentDidMount() {
    const showId = window.location.pathname.split('/').pop();
    fetch('/rest/shows')
      .then((response) => response.json())
      .then((shows: Show[]) => {
        const foundShow = shows.find((show) => show.id === showId);
        this.setState({ show: foundShow || null, loading: false });
      });
  }

  render() {
    const { show, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (show) {
      return show.id ? <DetailsContent show={show} /> : <Loading />;
    } else {
      return <Navigate to='/not-found' replace />;
    }
  }
}