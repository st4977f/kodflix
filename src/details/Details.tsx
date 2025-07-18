import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import getShows from '../shows';
import './Details.css';

const Details: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const [show] = useState(() => getShows().find((s) => s.id === showId));

  return show ? <h1>{show.title}</h1> : <Navigate to="/not-found" replace />;
};

export default Details;
