import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import './Details.css';

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
        <h3 className='details-content-synopsis'>
          {show.synopsis}
        </h3>
        <div className='details-content-cover'>
          <img
            src={require(`../common/images/${show.id}.jpg`)}
            alt={show.title}
          />
        </div>
      </div>
    </div>
  );
}

const Details: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const [show, setShow] = React.useState<Show | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/rest/shows')
      .then(response => response.json())
      .then((shows: Show[]) => {
        const foundShow = shows.find(show => show.id === showId);
        setShow(foundShow || null);
        setLoading(false);
      });
  }, [showId]);

  if (loading) return <div />;

  if (!show) return <Navigate to='/not-found' replace />;

  return <DetailsContent show={show} />;
}

export default Details;