import React from 'react';
import { useParams } from 'react-router-dom';
import getShows from '../shows';
import './Details.css';

const Details: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const show = getShows().find((s) => s.id === showId);

  return <h1>{show?.title}</h1>;
};

export default Details;
