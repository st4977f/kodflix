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

  handleDelete = async (id: string, callback?: () => void) => {
    if (!window.confirm('Are you sure you want to delete this show?')) return;
    try {
      const res = await fetch(`/api/shows/${id}`, { method: 'DELETE' });
      if (res.ok) {
        this.setState((prevState) => ({
          shows: prevState.shows ? prevState.shows.filter(show => show.id !== id) : prevState.shows
        }), () => {
          alert('Show deleted successfully!');
          if (callback) callback();
        });
      } else {
        alert('Failed to delete show.');
      }
    } catch (err) {
      alert('Error deleting show.');
    }
  };

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
              onDelete={() => this.handleDelete(show.id)}
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
  onDelete
}: InfoPanelProps) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (onDelete) {
      await onDelete();
      navigate('/admin/tv-shows/list');
    }
  };
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
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
