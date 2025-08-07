import React from 'react';
import Loading from '../../common/loading/loading';
import './AdminShowsList.css';

interface Show {
  id: string;
  title: string;
  description: string[];
  synopsis: string;
}

interface AdminShowsListState {
  shows: Show[] | null;
}

export default class AdminShowsList extends React.Component<
  {},
  AdminShowsListState
> {
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
    const { shows } = this.state;

    if (!shows) {
      return <Loading />;
    }

    return (
      <div>
        <div className="admin-shows-list">List of Shows</div>
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
}

function InfoPanel({
  id,
  title,
  description,
  synopsis,
}: InfoPanelProps) {
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
      </div>
    </div>
  );
}
