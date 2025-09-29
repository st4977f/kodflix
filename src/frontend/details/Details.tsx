import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from '../common/loading/loading';
import fetchData from '../common/fetch';
import NotFound from '../not-found/NotFound';
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
      setLoading(false);
      setShow(null);
      return;
    }
    let didFinish = false;
    const timeout = setTimeout(() => {
      if (!didFinish) {
        navigate('/not-found', { replace: true });
      }
    }, 2000);
    fetchData(`/rest/shows/${showId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    })
      .then((show: Show | null | undefined) => {
        didFinish = true;
        clearTimeout(timeout);
        if (!show) {
          navigate('/not-found', { replace: true });
        } else {
          setShow(show);
          setLoading(false);
        }
      })
      .catch((error) => {
        didFinish = true;
        clearTimeout(timeout);
        console.error('Error fetching show details:', error);
        navigate('/not-found', { replace: true });
      });
    return () => clearTimeout(timeout);
  }, [showId, navigate]);

  if (loading) {
    return <Loading />;
  }
  if (show) {
    return <DetailsContent show={show} />;
  }
  return <NotFound />;
};

export default Details;
