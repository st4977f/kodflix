import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';
import Loading from '../common/loading/loading';

interface Show {
  id: string;
  title: string;
  synopsis: string;
}

function DetailsContent({ show }: { show: Show }) {
  return (
    <div
      className="details"
      style={{
        backgroundImage: `url(${require(`../common/images/wallpapers/${show.id}.jpg`)})`,
      }}
    >
      <div className="details-content">
        <h1 className="details-content-title">{show.title}</h1>
        <h3 className="details-content-synopsis">{show.synopsis}</h3>
      </div>
    </div>
  );
}

const Details: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!showId) {
      navigate('/not-found', { replace: true });
      return;
    }
    fetch(`/rest/shows/${showId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Show not found');
        }
        return response.json();
      })
      .then((show: Show) => {
        setShow(show);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
        setShow(null);
        setLoading(false);
        navigate('/not-found', { replace: true });
      });
  }, [showId, navigate]);

  if (loading) {
    return <Loading />;
  }
  if (show) {
    return <DetailsContent show={show} />;
  }
  return null;
};

export default Details;
