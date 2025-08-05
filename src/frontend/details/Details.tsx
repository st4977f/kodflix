import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from '../common/loading/loading';
import fetchData from '../common/fetch';
import './Details.css';

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
        <div>
          <Link to={`/${show.id}/play`} className="details-play" />
        </div>
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
    fetchData(`/rest/shows/${showId}`)
      .then((show: Show) => {
        setShow(show);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
        setShow(null);
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
