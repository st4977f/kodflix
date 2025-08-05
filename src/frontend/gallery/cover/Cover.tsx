import React from 'react';
import './Cover.css';
import { Link } from 'react-router-dom';

interface CoverProps {
  id: string;
  title: string;
  description: string | string[];
}

class Cover extends React.Component<CoverProps> {
  render() {
    const { id, title, description } = this.props;
    const genres = Array.isArray(description) ? description : description.split(' | ');

    return (
      <Link to={`/${id}`} className="cover">
        <img
          src={require(`../../common/images/covers/${id}.jpg`)}
          alt={title}
        />
        <div className="cover-overlay">
          <h1>{title}</h1>  
          <p>{genres.map((genre, index) => (
            <span key={index} className="genre">{genre}</span>
          ))}</p>
        </div>
      </Link>
    );
  }
}

export default Cover;
