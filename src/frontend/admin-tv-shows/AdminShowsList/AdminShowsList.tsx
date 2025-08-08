import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../common/loading/loading';
import './AdminShowsList.scss';

interface Show {
  id: string;
  title: string;
  description: string[];
  synopsis: string;
}

interface AdminShowsListState {
  shows: Show[] | null;
}

export default class AdminShowsList extends Component<{}, AdminShowsListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shows: null,
    };
  }

  componentDidMount() {
    fetch('/rest/shows')
      .then((res) => res.json())
      .then((shows: Show[]) => this.setState({ shows }));
  }

  render() {
    let { shows } = this.state;

    if (!shows) {
      return <div><Loading /></div>;
    }

    return (
      <div>
        <div className="admin-shows-list">List of Shows</div>
        <Link to="../add" className="add-shows-link">Add Shows</Link>
        <div className="admin-shows-list-container">
          {shows.map((show) => (
            <InfoPanel
              key={show.id}
              id={show.id}
              title={show.title}
              description={show.description}
              synopsis={show.synopsis}
            />
          ))}
        </div>
      </div>
    );
  }
}

interface InfoPanelProps {
  id: string;
  title: string;
  description: string[];
  synopsis: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function InfoPanel({
  id,
  title,
  description,
  synopsis,
  onEdit,
  onDelete
}: InfoPanelProps) {
  const navigate = useNavigate();
  return (
    <div className="admin-show-panel">
      <div className="admin-panel-image">
        <img
          src={require(`../../common/images/covers/${id}.jpg`)}
          title={title}
        />
      </div>
      <div className="admin-panel-title">
        <h1>{title}</h1>
        <div className="admin-panel-description">
          {description.map((desc, idx) => (
            <span key={idx} className="admin-desc-item">{desc}</span>
          ))}
        </div>
        <p className="admin-panel-synopsis">{synopsis}</p>
        <div className="admin-panel-actions">
          <button className="edit-btn" onClick={() => navigate(`../edit/${id}`)}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
